import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDTO {
    @IsString()
    nome: string;
    
    @IsEmail()
    email: string
}