import { Post } from "src/post/entity/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({
        unique: true
    })
    email: string;

    @OneToMany(type => Post, post => post.usuarioID)
    posts: Post[];
}