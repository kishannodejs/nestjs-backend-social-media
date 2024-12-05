import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCatDto {

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsNumber()
    age?: number;
  
    @IsString()
    breed?: string;
}