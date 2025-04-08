import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name in english",
    example: "Electronics",
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    description: "Category name in german",
    example: "Elektronik",
  })
  @IsString()
  @IsNotEmpty()
  name_de: string;

  @ApiProperty({
    description: "Category name in russian",
    example: "Электроника",
  })
  @IsString()
  @IsNotEmpty()
  name_ru: string;
}
