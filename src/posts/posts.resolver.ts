import { Injectable, Inject } from "@nestjs/common";
import { Resolver, Query, Subscription, Args, Int } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PUB_SUB } from "src/pubSub.module";
import { Post } from "./post.model";
import { PostDto } from "./post.dto";
import { Token } from "../token";

@Resolver(() => Post)
@Injectable()
export class PostsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello World!";
  }

  @Subscription(() => Post, {
    name: Token.PostCreated,
    filter: (payload, variables) => {
      return payload.discussion_id === variables.discussionId;
    },
    resolve: (payload) => payload,
  })
  async subscribePostCreated(
    @Args("discussionId", { type: () => Int }) _discussionId: number
  ) {
    return this.pubSub.asyncIterator(Token.PostCreated);
  }

  @Subscription(() => Post, {
    name: Token.PostUpdated,
    filter: (payload, variables) => {
      return payload.discussion_id === variables.discussionId;
    },
    resolve: (payload) => payload,
  })
  async subscribePostUpdated(
    @Args("discussionId", { type: () => Int }) _discussionId: number
  ) {
    return this.pubSub.asyncIterator(Token.PostUpdated);
  }

  @Subscription(() => Int, {
    name: Token.PostDeleted,
    filter: (payload, variables) => {
      return payload.record.discussion_id === variables.discussionId;
    },
    resolve: (payload: PostDto) => {
      return payload.record.id;
    },
  })
  async subscribePostDeleted(
    @Args("discussionId", { type: () => Int }) _discussionId: number
  ) {
    return this.pubSub.asyncIterator(Token.PostDeleted);
  }
}
