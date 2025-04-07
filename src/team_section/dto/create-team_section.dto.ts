import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamSectionDto {
  @ApiProperty({
    description: "URL or path of the team image",
    example: "https://example.com/team-image.jpg",
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image: string;

  @ApiProperty({
    description: "Full name of the team member",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: "Position in German",
    example: "Manager",
  })
  @IsString()
  @IsNotEmpty()
  position_de: string;

  @ApiProperty({
    description: "Position in Russian",
    example: "Менеджер",
  })
  @IsString()
  @IsNotEmpty()
  position_ru: string;

  @ApiProperty({
    description: "Position in English",
    example: "Manager",
  })
  @IsString()
  @IsNotEmpty()
  position_en: string;
}
