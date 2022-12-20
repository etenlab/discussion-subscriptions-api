import { Injectable, Inject } from "@nestjs/common";
import { Resolver, Query, Subscription, Args, Int } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PUB_SUB } from "src/pubSub.module";
import { Reaction } from "./reaction.model";
import { DeletedReaction } from "./reaction.dto";
import { Token } from "../token";

@Resolver(() => Reaction)
@Injectable()
export class ReactionsResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello World!";
  }

  @Subscription(() => Reaction, {
    name: Token.ReactionCreated,
    filter: (payload: Reaction, variables) => {
      return payload.post.discussion_id === variables.discussionId;
    },
    resolve: (payload) => payload,
  })
  async subscribeReactionCreated(
    @Args("discussionId", { type: () => Int }) _discussionId: number
  ) {
    return this.pubSub.asyncIterator(Token.ReactionCreated);
  }

  @Subscription(() => Int, {
    name: Token.ReactionDeleted,
    filter: (payload: DeletedReaction, variables) => {
      return payload.discussion_id === variables.discussionId;
    },
    resolve: (payload: DeletedReaction) => payload.reaction_id,
  })
  async subscribeReactionDeleted(
    @Args("discussionId", { type: () => Int }) _discussionId: number
  ) {
    return this.pubSub.asyncIterator(Token.ReactionDeleted);
  }
}
