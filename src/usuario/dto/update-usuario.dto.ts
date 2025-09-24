import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateUsuarioDTO {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsNumber()
    id: number;
}