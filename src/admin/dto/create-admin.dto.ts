import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Admin login",
    example: "admin",
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: "Admin password",
    example: "password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "Admin confirm password",
    example: "password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsBoolean()
  @IsOptional()
  is_creator: boolean
}
