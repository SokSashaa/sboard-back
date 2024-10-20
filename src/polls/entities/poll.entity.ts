import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Poll_Item} from "./poll_item.entity";

@Entity()
export class Poll {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({default: 0})
    count_votes: number

    @OneToMany(()=>Poll_Item, pollItem=>pollItem.id_item)
    @JoinColumn()
    poll_items: Poll_Item[]

    @Column()
    created_at: Date
}
