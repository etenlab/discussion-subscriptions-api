import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from 'src/posts/post.model';

@Entity(`reactions`, {
  schema: `admin`,
})
@ObjectType()
export class Reaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  post_id: number;

  @Column()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => String)
  content: string;
}
