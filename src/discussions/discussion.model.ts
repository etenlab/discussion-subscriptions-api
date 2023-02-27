import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../posts/post.model';
import { AppList } from '../app-list/app-list.model';
import { Organization } from '../organization/organizations.model';

@Entity(`discussions`, {
  schema: 'admin',
})
@ObjectType()
export class Discussion {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: 0 })
  app: number;

  @Column({ default: 0 })
  org: number;

  @Column()
  @Field()
  table_name: string;

  @Column()
  @Field(() => Int)
  row: number;

  @Field(() => [Post], { nullable: 'items' })
  @OneToMany(() => Post, (post) => post.discussion)
  posts: Post[];

  @Field(() => AppList)
  @OneToOne(() => AppList, (appList) => appList.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'app',
  })
  appList: AppList;

  @Field(() => Organization)
  @OneToOne(() => Organization, (organization) => organization.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'org',
  })
  organization: Organization;
}
