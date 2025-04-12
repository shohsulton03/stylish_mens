import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { LogInDto } from './dto/log-in.dto';
import { CookieGetter } from '../common/decorators/cookie-getter.decorator';
import { RefreshTokenDto } from './dto/refresh-roken.dto';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register new admin" })
  @ApiResponse({
    status: 201,
    description: "Registered",
    type: Object,
  })
  @Post("register")
  async register(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.register(createAdminDto, res);
  }

  @ApiOperation({ summary: "Log in User" })
  @ApiResponse({
    status: 200,
    description: "Loh in",
    type: Object,
  })
  @HttpCode(200)
  @Post("login")
  async login(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(logInDto, res);
  }

  @ApiOperation({ summary: "Refresh tokens" })
  @ApiResponse({
    status: 200,
    description: "Refresh",
    type: Object,
  })
  @HttpCode(200)
  @Post("refresh")
  async refresh(
    @Body() refreshTokenDto:RefreshTokenDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(refreshTokenDto.refresh_token, res);
  }
}
