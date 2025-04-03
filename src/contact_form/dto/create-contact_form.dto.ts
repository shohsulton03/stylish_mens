import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactFormDto {

    @ApiProperty({
        description: "Your name",
        example: "John Doe"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "Your phone number",
        example: "+998991112233"
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;


    @ApiProperty({
        description: "Your email",
        example: "john@example.com"
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Your comment",
        example: "Hello, John Doe"
    })
    @IsString()
    @IsNotEmpty()
    comments: string;


}
