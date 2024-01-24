import HttpClient from '../utils/http.client';
import config from '../config';
import { Post } from '../models/posts.interfaces';

const { posts, baseUrl } = config.api;

export class PostsService {
  static getUserPosts = async (userId: number): Promise<Post[]> => {
    return (await HttpClient.get(`${baseUrl}${posts}/${userId}`))
      .data as Post[];
  };

  static deletePostById = async (postId: number) => {
    return HttpClient.delete(`${baseUrl}${posts}/${postId}`);
  };
}
