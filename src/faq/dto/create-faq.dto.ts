import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
  @ApiProperty({
    description: "question",
    example: "question",
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: "answer",
    example: "asnwer",
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
