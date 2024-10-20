import {IsString} from "class-validator";

export class CreatePollItemDto {
    @IsString()
    option: string
}
