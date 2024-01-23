import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { PostDto } from './posts.dto';
export declare class PostsService {
    private readonly httpService;
    private readonly postRepository;
    constructor(httpService: HttpService, postRepository: Repository<PostEntity>);
    private readonly externalPostsApiUrl;
    fetchPosts(): Observable<AxiosResponse<any[]>>;
    getPostsByUserId(userId: number): Promise<PostDto[]>;
    deletePostsById(postId: number): Promise<void>;
    private mapEntityToDto;
}
