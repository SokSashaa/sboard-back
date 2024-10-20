import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollsModule } from './polls/polls.module';
import {Poll} from "./polls/entities/poll.entity";
import {Poll_Item} from "./polls/entities/poll_item.entity";
import * as process from 'process';

@Module({
  imports: [ ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRESS_DB_URL,
    port: Number(process.env.POSTGRESS_DB_PORT),
    username: process.env.POSTGRESS_DB_USER,
    password: process.env.POSTGRESS_DB_PASSWORD,
    database: process.env.POSTGRESS_DB_NAME,
    entities: [Poll, Poll_Item],
    synchronize: true,
  }), PollsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
