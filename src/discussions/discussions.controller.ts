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
import { DiscussionsService } from './discussions.service';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pubSub.module';
import { DiscussionDto } from './discussion.dto';

@Controller()
@UseFilters(ExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class DiscussionsController {
  constructor(
    @Inject(Token.PgNotifyClient)
    private readonly client: ClientProxy,
    private readonly discussionsService: DiscussionsService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @PgNotifyEventPattern('discussion_created')
  @UsePipes(new ValidationPipe({ transform: true }))
  async onDiscussionCreated(@Payload() payload: DiscussionDto): Promise<void> {
    const discussion = await this.discussionsService.findDiscussion(payload);
    this.pubSub.publish(Token.DiscussionCreated, discussion);
  }
}
