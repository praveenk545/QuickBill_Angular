import { IsEmail, isNumber } from "@nestjs/class-validator";
import { UploadedFiles,UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, isEmail } from "class-validator";
import { memoryStorage } from "multer";
import { filter } from "rxjs";
import { Binary } from "typeorm";
import { ApiBody, ApiConsumes,  } from '@nestjs/swagger';
import { HasExtension, IsFile, MemoryStoredFile, } from "nestjs-form-data";
export class CreateRegisterDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    itemName:string;

    @ApiProperty()
    unitPrice:string;

    @ApiProperty()
    quantity:string;

    // @ApiProperty()
    // amount:any;
}
