import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ReactionDto, DeletedReaction } from "./reaction.dto";
import { Reaction } from "./reaction.model";
import { Post } from "../posts/post.model";

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  // Whenever we found changes in Discussion Table, this function is called by conroller,
  // and return a Post.
  async findReaction(payload: ReactionDto): Promise<Reaction> {
    const { operation, record } = payload;

    if (operation !== "INSERT") {
      return;
    }

    const reaction = await this.reactionsRepository.findOneOrFail({
      relations: ["post", "post.discussion"],
      where: { id: record.id },
    });

    if (!reaction) {
      throw new NotFoundException(`Reaction #${record.id} not found`);
    }

    return reaction;
  }

  async findDiscussion(payload: ReactionDto): Promise<DeletedReaction> {
    const { operation, record } = payload;

    if (operation !== "DELETE") {
      return;
    }

    const post = await this.postsRepository.findOneOrFail({
      where: { id: record.id },
    });

    if (!post) {
      throw new NotFoundException(`Post #${record.id} not found`);
    }

    return {
      discussion_id: post.discussion_id,
      reaction_id: record.id,
    } as DeletedReaction;
  }
}
