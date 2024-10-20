import {ApiProperty} from "@nestjs/swagger";
import {CreatePollItemDto} from "./create-poll-item.dto";
import {IsArray, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";


export class CreatePollDto {

    @ApiProperty({type: 'string', default: 'Test'})
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        type: 'array', default: [{
            option: 'Вар 1',
        }, {
            option: 'Вар 2',
        }]
    })
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => CreatePollItemDto)
    poll_items: CreatePollItemDto[]

}
