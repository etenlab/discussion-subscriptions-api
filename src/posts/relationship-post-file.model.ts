import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from './file.model';
import { Post } from './post.model';

@Entity(`relationship_post_file`, {
  schema: `admin`,
})
@ObjectType()
export class RelationshipPostFile {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => Post, (post) => post.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  file_id: number;

  @Field(() => File)
  @OneToOne(() => File, (file) => file.id)
  @JoinColumn({
    name: 'file_id',
  })
  file: File;
}
