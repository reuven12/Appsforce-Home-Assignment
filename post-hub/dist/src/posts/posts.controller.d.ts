import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPostsByUser(id: number): Promise<import("./posts.dto").PostDto[]>;
    deletePostById(id: number): Promise<void>;
}
