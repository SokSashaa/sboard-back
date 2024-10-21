import {Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {PollsService} from './polls.service';
import {CreatePollDto} from './dto/create-poll.dto';
import {ApiTags,ApiOperation} from "@nestjs/swagger";
import {CreateVoteDto} from "./dto/create-vote.dto";

@Controller('polls')
@ApiTags('Polls')
export class PollsController {
    constructor(private readonly pollsService: PollsService) {
    }

    @Post(':id/vote')
    @ApiOperation({summary: 'Голос за определенный ответ в определенном голосовании'})
    vote(@Param('id') id: number, @Body() data: CreateVoteDto) {
        return this.pollsService.vote(id, data)
    }

    @Post()
    @ApiOperation({summary: 'Создание голосования'})
    create(@Body() data: CreatePollDto) {
        return this.pollsService.create(data)
    }

    @Get()
    @ApiOperation({summary: 'Получение всех голосований'})
    findAll() {
        return this.pollsService.getAllPolls()
    }

    @Delete(':id')
    @ApiOperation({summary: 'Удаление голосования по его id '})
    remove(@Param('id') id: string) {
        return this.pollsService.deletePolls(id)
    }

}
