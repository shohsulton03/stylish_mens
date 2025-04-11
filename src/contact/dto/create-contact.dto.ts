import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateContactDto {
  @ApiProperty({
    description: "contact phone number",
    example: "+998907777777",
  })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  phone_number: string;

  @ApiProperty({
    description: "contact email address",
    example: "example@gmail.com",
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsOptional()
  @IsString()
  address_en: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsOptional()
  @IsString()
  address_ru: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsOptional()
  @IsString()
  address_de: string;
}
