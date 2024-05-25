import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isEmail } from "class-validator";


export class CreateItemDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    itemName:string;

    @ApiProperty()
    unitPrice:string;

    @ApiProperty()
    quantity:string;
}
