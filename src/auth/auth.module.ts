import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admin/entities/admin.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AdminModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
