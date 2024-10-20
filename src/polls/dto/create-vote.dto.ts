import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateVoteDto {
    @ApiProperty({default: '1', type: 'string'})
    @Type(() => Number)
    id_item: number
}
