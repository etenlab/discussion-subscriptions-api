import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity(`users`, {
  schema: `admin`,
  synchronize: false,
})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  user_id: number;

  @Column({ default: true })
  @Field(() => Boolean)
  active: boolean;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column({ default: false })
  @Field(() => Boolean)
  is_email_verified: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;
}
