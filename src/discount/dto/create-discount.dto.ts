import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class CreateDiscountDto {
  @ApiProperty({
    description: "The discount percentage",
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty({
    description: "The start date of the discount (format: YYYY-MM-DD)",
    example: "2025-04-01",
  })
  @IsNotEmpty()
  @IsDateString()
  started_at: string;

  @ApiProperty({
    description: "The end date of the discount (format: YYYY-MM-DD)",
    example: "2025-05-01",
  })
  @IsNotEmpty()
  @IsDateString()
  finished_at: string;

  @ApiProperty({
    description: "The status of the discount",
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
