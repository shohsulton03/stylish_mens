import { PartialType } from '@nestjs/swagger';
import { CreateContactBotServiceDto } from './create-contact-bot-service.dto';

export class UpdateContactBotServiceDto extends PartialType(CreateContactBotServiceDto) {}
