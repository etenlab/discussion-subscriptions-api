import { Injectable, Inject } from '@nestjs/common';
import { Resolver, Query, Subscription, Args, Int } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/pubSub.module';
import { Post } from './post.model';
import { PostDto } from './post.dto';
import { Token } from '../token';

@Resolver(() => Post)
@Injectable()
export class PostsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World!';
  }

  @Subscription(() => Post, {
    name: Token.PostCreated,
    filter: (payload: { postCreated: Post }, variables) => {
      return payload.postCreated.discussion.id === variables.discussionId;
    },
  })
  async subscribePostCreated(
    @Args('discussionId', { type: () => Int }) _discussionId: number,
  ) {
    return this.pubSub.asyncIterator(Token.PostCreated);
  }

  @Subscription(() => Int, {
    name: Token.PostDeleted,
    filter: (payload: { postDeleted: PostDto }, variables) => {
      return (
        payload.postDeleted.record.discussion_id === variables.discussionId
      );
    },
    resolve: (payload: { postDeleted: PostDto }) =>
      payload.postDeleted.record.id,
  })
  async subscribePostDeleted(
    @Args('discussionId', { type: () => Int }) _discussionId: number,
  ) {
    return this.pubSub.asyncIterator(Token.PostDeleted);
  }
}