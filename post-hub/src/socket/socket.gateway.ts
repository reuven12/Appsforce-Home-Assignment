import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PostDto } from 'src/posts/posts.dto';

@WebSocketGateway(8001, { cors: '*' })
export class SocketGateway {
  @WebSocketServer()
  server: any;

  @SubscribeMessage('postCreated')
  emitPostCreated(post: PostDto) {
    this.server.emit('postCreated', post);
  }

  @SubscribeMessage('postDeleted')
  emitPostDeleted(postId: number) {
    this.server.emit('postDeleted', postId);
  }
}
