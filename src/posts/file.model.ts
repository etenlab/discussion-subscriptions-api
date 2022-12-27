import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(`files`, {
  schema: `admin`,
})
@ObjectType()
export class File {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  file_name: string;

  @Column()
  @Field(() => Int)
  file_size: number;

  @Column()
  @Field(() => String)
  file_type: string;

  @Column()
  @Field(() => String)
  file_url: string;
}
