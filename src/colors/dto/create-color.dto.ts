import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto {
    @ApiProperty({
        description: "Color name",
        example: "Black"
    })
    @IsNotEmpty()
    @IsString()
    color: string; 

}
