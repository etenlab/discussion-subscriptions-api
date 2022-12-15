import { IsNumber, IsString } from 'class-validator';
import { PayloadDto } from '../payload.dto';

class Discussion {
  @IsNumber()
  id: number;

  @IsNumber()
  app: number;

  @IsNumber()
  org: number;

  @IsString()
  table_name: string;

  @IsNumber()
  row: number;
}

export type DiscussionDto = PayloadDto<Discussion>;
