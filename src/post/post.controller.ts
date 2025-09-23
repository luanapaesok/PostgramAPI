import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Get('')
    getAll(){
        return this.postService.getAll()
    }

    @Get(':id')
    getByID(@Param('id') id: number){
        return this.postService.getPostByID(id);
    }

    @Post('')
    create(@Body() data: CreatePostDTO){
        return this.postService.create(data);
    }

    @Delete('')
    deleteAll(){
        return this.postService.deleteAll();
    }

    @Delete(':id')
    deleteByID(@Param('id') id: number){
        return this.postService.deleteByID(id);
    }

}