import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { PostDto } from './posts.dto';
import { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';

import appConfig from '../../config';
@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  private readonly externalPostsApiUrl = this.config.externalPostsApiUrl;

  fetchPosts(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get<any[]>(this.externalPostsApiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => error);
      }),
    );
  }

  async getPostsByUserId(userId: number): Promise<PostDto[]> {
    try {
      const userPostsFromDatabase = await this.postRepository.find({
        where: { userId },
      });

      if (userPostsFromDatabase.length > 0) {
        return userPostsFromDatabase.map((post) => this.mapEntityToDto(post));
      }

      const localPostsFromUser = (
        await lastValueFrom(this.fetchPosts())
      ).data.filter((post: PostDto) => post.userId === Number(userId));

      const entitiesToSave = localPostsFromUser
        .map((post) => this.postRepository.create(post))
        .flat();

      await this.postRepository.save(entitiesToSave);

      return localPostsFromUser.map((post) => this.mapEntityToDto(post));
    } catch (error) {
      console.error('Error in getPostsByUserId:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  async deletePostsById(postId: number): Promise<void> {
    try {
      await this.postRepository.delete(postId);
    } catch (error) {
      console.error('Error in deletePostsById:', error);
      throw new Error('Failed to delete posts');
    }
  }

  private mapEntityToDto(apiPost: any): PostDto {
    return {
      userId: apiPost.userId,
      id: apiPost.id,
      title: apiPost.title,
      body: apiPost.body,
    };
  }
}
