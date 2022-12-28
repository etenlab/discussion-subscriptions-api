import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Post } from 'src/posts/post.model';
import { User } from 'src/users/user.model';

@Entity(`reactions`, {
  schema: `admin`,
})
@Unique(['user_id', 'content', 'post_id'])
@ObjectType()
export class Reaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Field(() => Int)
  @Column()
  post_id: number;

  @Column()
  @Field(() => Int)
  user_id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.user_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column()
  @Field(() => String)
  content: string;
}
