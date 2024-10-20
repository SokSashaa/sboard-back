import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Poll} from "./poll.entity";

@Entity()
export class Poll_Item {

    @PrimaryGeneratedColumn()
    id_item: number

    @Column()
    option: string

    @Column({default: 0})
    count_voice: number

    @ManyToOne(() => Poll, poll => poll.id, {nullable: false})
    @JoinColumn({name: 'poll'})
    poll: Poll
}
