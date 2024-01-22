import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPostsByUser(@Param('id') id: number) {
    return await this.postsService.getPostsByUserId(id);
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: number) {
    return await this.postsService.deletePostsById(id);
  }
}
