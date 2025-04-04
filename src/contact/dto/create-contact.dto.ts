import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateContactDto {
  @ApiProperty({
    description: "contact phone number",
    example: "+998907777777",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message:
      "The phone number must be in international format (for example, +14155552671)",
  })
  phone_number: string;

  @ApiProperty({
    description: "contact email address",
    example: "example@gmail.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsString()
  @IsNotEmpty()
  address_eng: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsString()
  @IsNotEmpty()
  address_ru: string;

  @ApiProperty({
    description: "Contact address",
    example: "123 Main St, Some City, Some Country",
  })
  @IsString()
  @IsNotEmpty()
  address_de: string;
}
