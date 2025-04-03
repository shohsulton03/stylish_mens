import { PartialType } from '@nestjs/swagger';
import { CreateTelegramBotDto } from './create-telegram_bot.dto';

export class UpdateTelegramBotDto extends PartialType(CreateTelegramBotDto) {}
