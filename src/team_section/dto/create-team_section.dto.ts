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
    description: "Position of the team member in the team",
    example: "Team Leader",
  })
  @IsString()
  @IsNotEmpty()
  position: string;
}
