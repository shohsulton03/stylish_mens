import { PartialType } from '@nestjs/swagger';
import { CreateMybotDto } from './create-mybot.dto';

export class UpdateMybotDto extends PartialType(CreateMybotDto) {}
