import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSizeDto {
    @ApiProperty({
        description: 'Size of the product',
        example: 'S',
    })
    @IsNotEmpty()
    @IsString()
    size: string;
}
