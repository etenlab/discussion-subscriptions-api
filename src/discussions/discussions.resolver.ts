import { Injectable, Inject } from '@nestjs/common';
import { Resolver, Query, Subscription, Args, Int } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pubSub.module';
import { Discussion } from './discussion.model';
import { Token } from '../token';

@Resolver(() => Discussion)
@Injectable()
export class DiscussionsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World!';
  }

  @Subscription(() => Discussion, {
    name: Token.DiscussionCreated,
    filter: (payload: { discussionCreated: Discussion }, variables) => {
      return (
        payload.discussionCreated.table_name === variables.table_name &&
        payload.discussionCreated.row === variables.row
      );
    },
  })
  async subscribeDiscussionCreated(
    @Args('table_name', { type: () => String }) _table_name: string,
    @Args('row', { type: () => Int }) _row: number,
  ) {
    return this.pubSub.asyncIterator<Discussion>(Token.DiscussionCreated);
  }
}
