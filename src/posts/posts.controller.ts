import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePostDto } from "./createPost.dto";
import { PostsService } from "./posts.service";
import { UpdatePostDto } from "./updatePost.dto";

@Controller('posts')
export class PostsController
{
    constructor(private readonly postsService: PostsService)
    { }

    @Get()
    async getAllPosts()
    {
        return await this.postsService.getAllPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id:string)
    {
        return await this.postsService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() Post: CreatePostDto)
    {
        return await this.postsService.createPost(Post);
    }

    @Put(':id')
    async replacePost(@Param('id') id:string, @Body() post:UpdatePostDto)
    {
        return await this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id:string)
    {
        return await this.postsService.deletePost(Number(id));
    }

}