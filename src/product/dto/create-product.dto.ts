import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsObject,
  ArrayMinSize,
  IsNotEmpty,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: "Mahsulot nomi inglis tilida",
    example: "Winter Jacket",
  })
  @IsString()
  @IsNotEmpty()
  title_eng: string;

  @ApiProperty({
    description: "Mahsulot nomi rus tilida",
    example: "Зимняя куртка",
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    description: "Mahsulot nomi germani tilida",
    example: "Winterjacke",
  })
  @IsString()
  @IsNotEmpty()
  title_de: string;

  @ApiProperty({
    description: "Mahsulot tavsifi (Inglizcha)",
    example: "High quality woolen jacket",
  })
  @IsString()
  @IsNotEmpty()
  description_eng: string;

  @ApiProperty({
    description: "Mahsulot tavsifi (Ruscha)",
    example: "Пальто из высококачественной шерсти",
  })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({
    description: "Mahsulot tavsifi (Nemischa)",
    example: "Hochwertige Wolljacke",
  })
  @IsString()
  @IsNotEmpty()
  description_de: string;

  @ApiProperty({
    description: "Mahsulot narxi",
    example: 120.5,
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "Mahsulot kategoriyasi ID si",
    example: 2,
  })
  @Type(() => Number)
  @IsNumber()
  category_id: number;

  @ApiProperty({
    description: "Mahsulot mavjud o‘lchamlar ID si ro‘yxati",
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  sizes_id: number[];

  @ApiProperty({
    description: "Mahsulot mavjud ranglar ID si ro‘yxati",
    example: [4, 5],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  colors_id: number[];

  @ApiProperty({
    description: "Mahsulot rasmlari",
    example: ["img1.jpg", "img2.jpg"],
  })
  @IsArray()
  @IsOptional()
  images: string[];

  @ApiProperty({
    description: "Mahsulot tarkibidagi materiallar",
    example: { cotton: "80%", wool: "20%" },
  })
  @IsString()
  @IsOptional()
  materials: { [key: string]: string };

  @ApiProperty({
    description: "Chegirma ID si (agar mavjud bo‘lsa)",
    example: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  discount_id: number;
}
