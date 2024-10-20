import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Poll} from "./entities/poll.entity";
import {Poll_Item} from "./entities/poll_item.entity";
import {CreatePollDto} from "./dto/create-poll.dto";
import {CreateVoteDto} from "./dto/create-vote.dto";

@Injectable()
export class PollsService {

    constructor(@InjectRepository(Poll) private repository: Repository<Poll>,
                @InjectRepository(Poll_Item) private poll_items_repository: Repository<Poll_Item>) {
    }

    async create(data: CreatePollDto) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (data.poll_items.length > 0) {

                const poll = await queryRunner.manager.insert(Poll, {
                    title: data.title,
                    created_at: new Date()
                })
                const {id} = poll.identifiers[0];
                for (let i = 0; i < data.poll_items.length; i++) {
                    await queryRunner.manager.insert(Poll_Item, {
                        option: data.poll_items[i].option,
                        poll: id
                    })
                }
                await queryRunner.commitTransaction();
                await queryRunner.release()
            } else {
                await queryRunner.rollbackTransaction();
                await queryRunner.release()
                return new HttpException('У голосования нет вариантов', HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            await queryRunner.rollbackTransaction()
            await queryRunner.release()
            throw new HttpException('Произошла ошибка', HttpStatus.BAD_REQUEST)
        }
        return HttpStatus.CREATED
    }

    async getAllPolls() {
        const polls = await this.repository.find({order: {created_at: "asc"}})
        for (const poll of polls) {
            poll.poll_items = await this.poll_items_repository.findBy({poll})
        }
        return polls
    }

    async deletePolls(id: string) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const deleteResult = await queryRunner.manager.delete(Poll_Item, {poll: id})
            if (deleteResult.affected > 0) {
                await queryRunner.manager.delete(Poll, {id})
            } else return HttpStatus.NOT_FOUND

        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
        await queryRunner.commitTransaction()
        await queryRunner.release()
        return HttpStatus.OK
    }

    async vote(id: number, data: CreateVoteDto) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const resultPollItems = await queryRunner.manager.increment(Poll_Item, {
            id_item: data.id_item,
            poll: {id}
        }, 'count_voice', 1)
        const result = await queryRunner.manager.increment(Poll, {id}, 'count_votes', 1)
        if (resultPollItems.affected > 0 && result.affected > 0) {
            await queryRunner.commitTransaction();
            await queryRunner.release()
            return HttpStatus.OK
        } else {
            await queryRunner.rollbackTransaction();
            await queryRunner.release()
            throw new HttpException('Голосование не найдено', HttpStatus.NOT_FOUND)
        }
    }
}
