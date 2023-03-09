import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(`organizations`, {
  schema: 'admin',
})
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;
}
