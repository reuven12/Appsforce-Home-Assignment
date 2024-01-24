"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const posts_entity_1 = require("./posts.entity");
let PostsService = class PostsService {
    constructor(httpService, postRepository) {
        this.httpService = httpService;
        this.postRepository = postRepository;
        this.externalPostsApiUrl = 'https://jsonplaceholder.typicode.com/posts';
    }
    fetchPosts() {
        return this.httpService.get(this.externalPostsApiUrl).pipe((0, rxjs_1.catchError)((error) => {
            console.error('Error fetching posts:', error);
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    async getPostsByUserId(userId) {
        try {
            const userPostsFromDatabase = await this.postRepository.find({
                where: { userId },
            });
            if (userPostsFromDatabase.length > 0) {
                return userPostsFromDatabase.map((post) => this.mapEntityToDto(post));
            }
            const localPostsFromUser = (await (0, rxjs_1.lastValueFrom)(this.fetchPosts())).data.filter((post) => post.userId === userId);
            const entitiesToSave = localPostsFromUser
                .map((post) => this.postRepository.create(post))
                .flat();
            await this.postRepository.save(entitiesToSave);
            return localPostsFromUser.map((post) => this.mapEntityToDto(post));
        }
        catch (error) {
            console.error('Error in getPostsByUserId:', error);
            throw new Error('Failed to fetch posts');
        }
    }
    async deletePostsById(postId) {
        try {
            await this.postRepository.delete(postId);
        }
        catch (error) {
            console.error('Error in deletePostsById:', error);
            throw new Error('Failed to delete posts');
        }
    }
    mapEntityToDto(apiPost) {
        return {
            userId: apiPost.userId,
            id: apiPost.id,
            title: apiPost.title,
            body: apiPost.body,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(posts_entity_1.PostEntity)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map