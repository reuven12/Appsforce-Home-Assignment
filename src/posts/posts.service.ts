import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { LocalDatabase } from './your-database-service';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly localDatabase: LocalDatabase,
  ) {}

  private readonly externalPostsApiUrl =
    'https://jsonplaceholder.typicode.com/posts';

  fetchPosts(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get<any[]>(this.externalPostsApiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => error);
      }),
    );
  }

  async getPostsByUserId(userId: number): Promise<any[]> {
    try {
      const userPostsFromLocalDatabase =
        await this.localDatabase.getLocalPostsByUserId(userId);
      if (userPostsFromLocalDatabase.lenght > 0)
        return userPostsFromLocalDatabase;
      const localPostsFromeUser = (
        await lastValueFrom(this.fetchPosts())
      ).data.filter((post) => post.userId === userId);
      await this.localDatabase.saveLocalPostsByUserId(userId, localPostsFromeUser);
      return localPostsFromeUser;
    } catch (error) {
      console.error('Error in getPostsByUserId:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  async deletePostsById(postId: string): Promise<void> {
    try {
      await this.localDatabase.deleteLocalPostsById(postId);
    } catch (error) {
      console.error('Error in deletePostsById:', error);
      throw new Error('Failed to delete posts');
    }
  }
}
