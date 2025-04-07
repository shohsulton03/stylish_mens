import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFaqDto {
  @ApiProperty({
    description: "Question in English",
    example: "What is your return policy?",
  })
  @IsString()
  @IsNotEmpty()
  question_en: string;

  @ApiProperty({
    description: "Question in Russian",
    example: "Какова ваша политика возврата?",
  })
  @IsString()
  @IsNotEmpty()
  question_ru: string;

  @ApiProperty({
    description: "Question in German",
    example: "Was ist Ihre Rückgaberechtsrichtlinie?",
  })
  @IsString()
  @IsNotEmpty()
  question_de: string;

  @ApiProperty({
    description: "Answer in English",
    example: "You can return items within 30 days.",
  })
  @IsString()
  @IsNotEmpty()
  answer_en: string;

  @ApiProperty({
    description: "Answer in Russian",
    example: "Вы можете вернуть товар в течение 30 дней.",
  })
  @IsString()
  @IsNotEmpty()
  answer_ru: string;

  @ApiProperty({
    description: "Answer in German",
    example: "Sie können Artikel innerhalb von 30 Tagen zurücksenden.",
  })
  @IsString()
  @IsNotEmpty()
  answer_de: string;
}
