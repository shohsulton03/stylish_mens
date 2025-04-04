// filter-product.dto.ts
import { IsOptional, IsArray, IsInt, IsString } from "class-validator";

export class FilterProductDto {
  @IsOptional()
  @IsString()
  title_de?: string;

  @IsOptional()
  @IsString()
  title_ru?: string;

  @IsOptional()
  @IsString()
  title_eng?: string;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  sizes_id?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  colors_id?: number[];

  @IsOptional()
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsInt()
  limit: number = 10;
}
