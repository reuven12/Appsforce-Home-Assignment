import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPostsByUser(@Param('id') id: number) {
    return await this.postsService.getPostsByUserId(id);
  }

  @Post()
  async createPost(@Body() post: PostDto) {
    return await this.postsService.createPost(post);
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: number) {
    return await this.postsService.deletePostsById(id);
  }
}
