import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { compare, hash } from "bcrypt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "../admin/entities/admin.entity";
import { Repository } from "typeorm";
import { generateTokens } from "../common/helpers/generate-token";
import { LogInDto } from "./dto/log-in.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async updateRefreshToken(id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.adminService.updateRefreshToken(id, hashed_refresh_token);
  }

  async register(createAdminDto: CreateAdminDto, res: Response) {
    const newAdmin = await this.adminService.create(createAdminDto);

    if (!newAdmin) {
      throw new BadRequestException("Admin creation failed.");
    }

    newAdmin.is_active = true;
    await this.adminRepo.save(newAdmin);

    const tokens = await generateTokens(newAdmin, this.jwtService);
    await this.updateRefreshToken(newAdmin.id, tokens.refresh_token);

    return { id: newAdmin.id, access_token: tokens.access_token, refresh_token: tokens.refresh_token };
  }

  async login(logInDto: LogInDto, res: Response) {
    const { login, password } = logInDto;
    const admin = await this.adminRepo.findOne({ where: { login } });

    if (!admin) {
      throw new UnauthorizedException("Email or password incorrect");
    }

    const validPassword = await compare(
      logInDto.password,
      admin.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email or password incorrect");
    }

    admin.is_active = true;
    await this.adminRepo.save(admin);

    const tokens = await generateTokens(admin, this.jwtService);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    return {
      message: "Admin login succesfully",
      id: admin.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async refresh(refresh_token: string, res: Response) {
    try {
      if (!refresh_token) {
        throw new UnauthorizedException("Refresh token is missing");
      }

      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!payload) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      console.log(payload);
      

      const admin = await this.adminRepo.findOne({where: {login: payload.login}})
      if (!admin) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const validRefreshToken = await compare(
        refresh_token,
        admin.hashed_refresh_token
      );

      if (!validRefreshToken) {
        throw new ForbiddenException("Invalid refresh token");
      }

      const tokens = await generateTokens(admin, this.jwtService);
      await this.updateRefreshToken(admin.id, tokens.refresh_token);

      return {
        message: "Token refreshed successfully",
        id: admin.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
