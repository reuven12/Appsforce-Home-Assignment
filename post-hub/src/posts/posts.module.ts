import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    HttpModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
