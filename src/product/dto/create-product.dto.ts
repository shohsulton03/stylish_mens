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
    description: "Mahsulot nomi",
    example: "Winter Jacket",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Mahsulot tavsifi",
    example: "High quality woolen jacket",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

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
//   @IsObject()
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
