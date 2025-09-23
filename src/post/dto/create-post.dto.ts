import { IsNumber, IsString } from "class-validator";

export class CreatePostDTO {
    @IsNumber()
    usuarioID?: number;
    
    @IsString()
    title: string;

    @IsString()
    description: string;
}