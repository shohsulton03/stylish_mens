import { Module } from '@nestjs/common';
import { TelegramService } from './telegram_bot.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TelegramModule, ConfigModule, HttpModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
