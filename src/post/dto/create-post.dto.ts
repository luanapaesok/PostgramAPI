import { IsNumber, IsObject, IsString } from "class-validator";
import { Usuario } from "src/usuario/entity/usuario.entity";

export class CreatePostDTO {
    @IsNumber()
    usuarioID?: number;
    
    @IsString()
    title: string;

    @IsString()
    description: string;
}