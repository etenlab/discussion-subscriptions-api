import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { PgNotifyServer } from 'nestjs-pg-notify';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

// Configgure Notification microservice as a hybrid mode so that can receive data
// from PostgreSQL and also use HTTP end point
(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new PgNotifyServer({
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
  });

  await app.startAllMicroservices();
  await app.listen(+process.env.PORT);
})();
