import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: "Category name",
        example: "Electronics"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Category description",
        example: "Electronics category for all electronics items"
    })
    @IsString()
    @IsNotEmpty()
    @Length(0, 2000)
    description: string;
}
