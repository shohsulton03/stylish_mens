import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @ApiProperty({
    description: "Admin login;",
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
}
