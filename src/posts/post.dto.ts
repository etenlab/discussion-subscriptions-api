import { IsDate, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PayloadDto } from '../payload.dto';

class Post {
  @IsNumber()
  id: number;

  @IsNumber()
  discussion_id: number;

  @IsNumber()
  user_id: number;

  @IsString()
  quill_text: string;

  @IsString()
  plain_text: string;

  @IsString()
  postgres_language: string;

  @IsDate()
  @Transform((params) => new Date(params.value))
  created_at: Date;
}

export type PostDto = PayloadDto<Post>;
