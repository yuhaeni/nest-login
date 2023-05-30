import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNumber()
    @IsNotEmpty()
    id: number; // 유저 고유 아이디
    
    @IsString()
    @IsNotEmpty()
    name: string; // 유저 이름

  }