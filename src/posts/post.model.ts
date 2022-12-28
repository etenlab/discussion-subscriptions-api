import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Discussion } from 'src/discussions/discussion.model';
import { Reaction } from 'src/reactions/reaction.model';
import { RelationshipPostFile } from './relationship-post-file.model';
import { User } from 'src/users/user.model';

@Entity(`posts`, {
  schema: `admin`,
})
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Discussion, (discussion) => discussion.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discussion_id' })
  discussion: Discussion;

  @Field(() => [Reaction], { nullable: 'items' })
  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @Field(() => [RelationshipPostFile], { nullable: 'items' })
  @OneToMany(
    () => RelationshipPostFile,
    (relationshipPostFile) => relationshipPostFile.post,
  )
  files: RelationshipPostFile[];

  @Column()
  @Field(() => Int)
  discussion_id: number;

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
  quill_text: string;

  @Column()
  @Field(() => String)
  plain_text: string;

  @Column()
  @Field(() => String, { nullable: false, defaultValue: 'simple' })
  postgres_language: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  is_edited: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  reply_id: number;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.id, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'reply_id',
  })
  reply: Post;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
