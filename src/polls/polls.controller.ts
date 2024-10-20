import {Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {PollsService} from './polls.service';
import {CreatePollDto} from './dto/create-poll.dto';
import {ApiBody} from "@nestjs/swagger";
import {CreateVoteDto} from "./dto/create-vote.dto";

@Controller('polls')
export class PollsController {
    constructor(private readonly pollsService: PollsService) {
    }

    @Post(':id/vote')
    vote(@Param('id') id: number, @Body() data: CreateVoteDto) {
        return this.pollsService.vote(id, data)
    }

    @Post()
    create(@Body() data: CreatePollDto) {
        return this.pollsService.create(data)
    }

    @Get()
    findAll() {
        return this.pollsService.getAllPolls()
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pollsService.deletePolls(id)
    }

}
