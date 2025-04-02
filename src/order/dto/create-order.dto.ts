import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        description: "The id of the cart the order is associated with",
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    cartId: number;

    @ApiProperty({
        description: "User full-name",
        example: "Jon Doe",
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;


    @ApiProperty({
        description: "User phone number",
        example: "+998991112233",
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: "User email address",
        example: "john.doe@example.com",
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "User address",
        example: "Uzbekistan",
    })
    @IsString()
    @IsNotEmpty()
    country: string;


    @ApiProperty({
        description: "User address",
        example: "Tashkent",
    })
    @IsString()
    @IsNotEmpty()
    city: string;


    @ApiProperty({
        description: "User address",
        example: "+99875554488",
    })
    @IsString()
    @IsNotEmpty()
    whatsapp_number: string;

}
