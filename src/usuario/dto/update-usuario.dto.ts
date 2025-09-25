import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class UpdateUsuarioDTO {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    })
    password: string;


    @IsNumber()
    id: number;
}