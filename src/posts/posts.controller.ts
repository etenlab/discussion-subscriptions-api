import {
  Controller,
  Inject,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { PgNotifyEventPattern } from 'nestjs-pg-notify';
import { ExceptionFilter } from '../exception.filter';
import { LoggingInterceptor } from '../logging.interceptor';
import { Token } from '../token';
import { PostsService } from './posts.service';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pubSub.module';
import { PostDto } from './post.dto';

@Controller()
@UseFilters(ExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class PostsController {
  constructor(
    @Inject(Token.PgNotifyClient)
    private readonly client: ClientProxy,
    private readonly postsService: PostsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @PgNotifyEventPattern('post_changed')
  @UsePipes(new ValidationPipe({ transform: true }))
  async onPostChanged(@Payload() payload: PostDto): Promise<void> {
    const { operation } = payload;

    switch (operation) {
      case 'INSERT': {
        const post = await this.postsService.findPost(payload);
        this.pubSub.publish(Token.PostCreated, post);
        break;
      }
      case 'DELETE': {
        this.pubSub.publish(Token.PostDeleted, payload);
        break;
      }
      default: {
        break;
      }
    }
  }
}