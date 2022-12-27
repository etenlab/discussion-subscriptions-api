import { Module } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PgNotifyClient } from "nestjs-pg-notify";
import { PostsResolver } from "./posts.resolver";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./post.model";
import { RelationshipPostFile } from "./relationship-post-file.model";
import { File } from "./file.model";
import { Token } from "../token";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([Post, RelationshipPostFile, File])],
  controllers: [PostsController],
  providers: [
    {
      provide: Token.PgNotifyClient,
      useFactory: (): ClientProxy =>
        new PgNotifyClient({
          connection: {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
          },
          strategy: {
            retryInterval: 1_000,
            retryTimeout: Infinity,
          },
        }),
    },
    PostsResolver,
    PostsService,
  ],
  exports: [Token.PgNotifyClient],
})
export class PostsModule {}
