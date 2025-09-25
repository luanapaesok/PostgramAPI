import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { Post } from "src/post/entity/post.entity";

export class CreateUsuarioDTO {
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
    
    posts: Post[]
}