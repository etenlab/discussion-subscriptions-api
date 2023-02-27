import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DiscussionDto } from './discussion.dto';
import { Discussion } from './discussion.model';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
  ) {}

  // Whenever we found changes in Discussion Table, this function is called by conroller,
  // and return a Discussion.
  async findDiscussion(payload: DiscussionDto): Promise<Discussion> {
    const { operation, record } = payload;

    if (operation !== 'INSERT') {
      return;
    }

    const discussion = await this.discussionRepository.findOne({
      relations: [
        'posts',
        'posts.user',
        'posts.reply',
        'posts.reply.user',
        'posts.reply.files',
        'posts.reactions',
        'posts.reactions.user',
        'posts.files',
        'posts.files.file',
        'appList',
        'organization',
      ],
      where: { id: record.id },
    });

    if (!discussion) {
      throw new NotFoundException(`Discussion #${record.id} not found`);
    }

    return discussion;
  }
}
