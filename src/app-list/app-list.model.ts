import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`app_list`, {
  schema: 'admin',
})
@ObjectType()
export class AppList {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  app_name: string;
}
