import { IsNumber } from "class-validator";
import { PayloadDto } from "../payload.dto";

class RelationshipPostFile {
  @IsNumber()
  id: number;

  @IsNumber()
  post_id: number;

  @IsNumber()
  file_id: number;
}

export type RelationshipPostFileDto = PayloadDto<RelationshipPostFile>;
