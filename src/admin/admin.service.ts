import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import { hash } from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const condidate = await this.adminRepository.findOne({
      where: { login: createAdminDto.login },
    });

    if (condidate) {
      throw new BadRequestException("Bunday admin mavjud");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parol mos kelmadi");
    }

    const hashed_password = await hash(createAdminDto.password, 7);
    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      hashed_password,
    });

    return this.adminRepository.save(newAdmin);
  }

  async findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException("admin not found");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException("Bunday admin mavjud emas");
    }

    if (updateAdminDto.login) {
      const checkAdmin = await this.adminRepository.findOne({
        where: { login: updateAdminDto.login },
      });

      if (checkAdmin && checkAdmin.id !== id) {
        throw new BadRequestException("Bunday admin login allaqachon mavjud");
      }
    }

    if (
      (updateAdminDto.password && !updateAdminDto.confirm_password) ||
      (!updateAdminDto.password && updateAdminDto.confirm_password)
    ) {
      throw new BadRequestException(
        "Iltimos, parol va tasdiqlovchi parolni birga kiriting."
      );
    }

    if (
      updateAdminDto.password &&
      updateAdminDto.password !== updateAdminDto.confirm_password
    ) {
      throw new BadRequestException("Parol mos kelmadi");
    }

    let hashed_password = admin.hashed_password;
    if (updateAdminDto.password) {
      hashed_password = await hash(updateAdminDto.password, 7);
    }

    await this.adminRepository.update(id, {
      login: updateAdminDto.login || admin.login,
      hashed_password,
    });

    return await this.adminRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException("admin not found");
    }
    await this.adminRepository.delete(id);
    return { message: `User with ${id} deleted succesfully` };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.adminRepository.update(id, { hashed_refresh_token });
  }
}
