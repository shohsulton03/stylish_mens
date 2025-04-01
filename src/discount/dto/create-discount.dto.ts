import { ApiProperty } from "@nestjs/swagger";
import { IsDataURI, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class CreateDiscountDto {
    @ApiProperty({
        description: "The discount percentage",
        example: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    discount: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
