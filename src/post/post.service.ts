import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Repository } from "typeorm";
import { CreatePostDTO } from "./dto/create-post.dto";
import { UpdatePostDTO } from "./dto/update-post.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

    getAll() {
        return this.postRepository.find()
    }

    getPostByID(id: number) {
        return this.postRepository.findOne({
            where: {
                id
            },
            relations: ['user']
        })
    }

    async create(data: CreatePostDTO) {
        // let userID = await this.usuarioService.getByID(data.usuarioID!);
        console.log(data)
        let newPost: CreatePostDTO = {
            usuarioID: data.usuarioID,
            title: data.title,
            description: data.description
        }

        let post = this.postRepository.create(newPost);
        return await this.postRepository.save(post);
    }

    deleteAll() {
        return this.postRepository.deleteAll();
    }

    deleteByID(id: number) {
        return this.postRepository.delete(id);
    }

    update(updateUserDto: UpdatePostDTO) {
        return this.postRepository.update(updateUserDto.id, updateUserDto);
    }
}