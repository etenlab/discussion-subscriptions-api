import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PostDto } from "./post.dto";
import { Post } from "./post.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  // Whenever we found changes in Discussion Table, this function is called by conroller,
  // and return a Post.
  async findPost(payload: PostDto): Promise<Post> {
    const { operation, record } = payload;

    if (operation === "DELETE") {
      return;
    }

    const post = await this.postRepository.findOneOrFail({
      relations: ["reactions", "files", "files.file", "discussion"],
      where: { id: record.id },
    });

    if (!post) {
      throw new NotFoundException(`Post #${record.id} not found`);
    }

    return post;
  }

  async findPostById(post_id: number): Promise<Post> {
    const post = await this.postRepository.findOneOrFail({
      relations: ["reactions", "files", "files.file", "discussion"],
      where: { id: post_id },
    });

    if (!post) {
      throw new NotFoundException(`Post #${post_id} not found`);
    }

    return post;
  }
}
