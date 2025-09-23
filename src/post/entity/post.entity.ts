import { Usuario } from "src/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Usuario, user => user.posts, {
        onDelete: 'CASCADE'
    })
    @JoinColumn(
        {
            name: 'user_id',
            referencedColumnName: 'id',
        }
    )
    usuarioID?: number;
}