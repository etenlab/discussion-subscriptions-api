import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  filename: string;

  @Column()
  @Field(() => String)
  url: string;
}
