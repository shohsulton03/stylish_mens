import { Module } from '@nestjs/common';
import { TelegramService } from './telegram_bot.service';

@Module({
  imports: [TelegramModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
