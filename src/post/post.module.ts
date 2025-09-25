import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Post } from "./entity/post.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        UsuarioModule, AuthModule
    ],
    controllers: [PostController],
    providers: [PostService, Post],
    exports: [PostService]
})
export class PostModule {

}