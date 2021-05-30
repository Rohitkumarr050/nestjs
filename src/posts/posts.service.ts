import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./createPost.dto";
import Post from "./post.entity";
import { UpdatePostDto } from "./updatePost.dto";

@Injectable()
export class PostsService
{
    constructor(@InjectRepository(Post) private PostsRepository: Repository<Post>){}

    async getAllPosts()
    {
        return await this.PostsRepository.find();
    }

    async getPostById(id:number)
    {
        const post = await this.PostsRepository.findOne(id);
        if(post)
        {
            return post;
        }
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    async updatePost(id:number,post:UpdatePostDto)
    {
        await this.PostsRepository.update(id, post);
        const updatedPost =  await this.PostsRepository.findOne(id);
        if(updatedPost)
        {
            return updatedPost;
        }
        throw new HttpException("POST not found", HttpStatus.NOT_FOUND);
    }

    async createPost(post: CreatePostDto)
    {
        let newPost = this.PostsRepository.create(post);
        await this.PostsRepository.save(newPost);
        return newPost;
    }

    async deletePost(id:number)
    {
        const deleteResponse = await this.PostsRepository.delete(id);
        if(!deleteResponse.affected)
        {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }
    }

}