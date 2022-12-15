import { IsNumber, IsString } from 'class-validator';
import { PayloadDto } from '../payload.dto';

export class Reaction {
  @IsNumber()
  id: number;

  @IsNumber()
  post_id: number;

  @IsNumber()
  user_id: number;

  @IsString()
  content: string;
}

export type ReactionDto = PayloadDto<Reaction>;

export type DeletedReaction = {
  discussion_id: number;
  reaction_id: number;
};
