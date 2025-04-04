import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    description: "Category name in english",
    example: "Electronics",
  })
  @IsString()
  @IsNotEmpty()
  name_eng: string;

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

  @ApiProperty({
    description: "Category description in English",
    example: "Electronics category for all electronics items",
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 2000)
  description_eng: string;

  @ApiProperty({
    description: "Category description in Russian",
    example: "Категория электроники для всех товаров электроники",
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 2000)
  description_ru: string;

  @ApiProperty({
    description: "Category description in German",
    example: "Elektronik-Kategorie für alle Elektronikartikel",
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 2000)
  description_de: string;
}
