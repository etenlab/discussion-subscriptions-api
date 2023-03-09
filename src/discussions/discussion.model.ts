import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../posts/post.model';
import { AppList } from '../app-list/app-list.model';
import { Organization } from '../organization/organizations.model';

@Entity(`discussions`, {
  schema: 'admin',
})
@ObjectType()
@Directive('@key(fields: "id")')
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
  @ManyToOne(() => AppList, (appList) => appList.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'app',
  })
  appList: AppList;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'org',
  })
  organization: Organization;
}
