import { IsOptional, IsArray, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FilterProductDto {
  @ApiProperty({
    description: "Title of the product in German",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  title_de?: string;

  @ApiProperty({
    description: "Title of the product in Russian",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiProperty({
    description: "Title of the product in English",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  title_eng?: string;

  @ApiProperty({
    description: "Category ID of the product",
    required: false,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category_id?: number;

  @ApiProperty({
    description: "Array of size IDs for the product",
    required: false,
    type: Number,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  sizes_id?: number[];

  @ApiProperty({
    description: "Array of color IDs for the product",
    required: false,
    type: Number,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  colors_id?: number[];

  @ApiProperty({
    description: "Page number for pagination",
    required: false,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @ApiProperty({
    description: "Number of items per page",
    required: false,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 10;
}
