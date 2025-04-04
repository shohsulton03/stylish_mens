import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto {
  @ApiProperty({
    description: "Color name in English",
    example: "Black",
  })
  @IsNotEmpty()
  @IsString()
  color_eng: string;

  @ApiProperty({
    description: "Color name in Russian",
    example: "Чёрный",
  })
  @IsNotEmpty()
  @IsString()
  color_ru: string;

  @ApiProperty({
    description: "Color name in German",
    example: "Schwarz",
  })
  @IsNotEmpty()
  @IsString()
  color_de: string;
}
