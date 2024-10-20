import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Poll} from "./entities/poll.entity";
import {Poll_Item} from "./entities/poll_item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Poll_Item])],
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
