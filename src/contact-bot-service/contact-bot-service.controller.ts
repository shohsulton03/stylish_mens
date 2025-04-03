import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactBotServiceController {
  private bot: Telegraf;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN_2') || '';
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') || '';
  
    if (!token || !this.chatId) {
      throw new Error('❌ Telegram token yoki chat ID yetishmayapti.');
    }
  
    this.bot = new Telegraf(token);
  }
  
  async sendMessage(message: string) {
    try {
      await this.bot.telegram.sendMessage(this.chatId, message);
      return '✅ Xabar yuborildi!';
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
      throw new Error('Telegram xabar yuborishda muammo yuz berdi.');
    }
  }
}
