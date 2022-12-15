import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Discussion } from 'src/discussions/discussion.model';
import { Reaction } from 'src/reactions/reaction.model';
import { RelationshipPostFile } from './relationship-post-file.model';

@Entity(`posts`, {
  schema: `admin`,
})
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => Discussion)
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
  discussion_id: number;

  @Column()
  @Field(() => Int)
  user_id: number;

  @Column()
  @Field(() => String)
  quill_text: string;

  @Column()
  @Field(() => String)
  plain_text: string;

  @Column()
  @Field(() => String, { nullable: false, defaultValue: 'simple' })
  postgres_language: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
