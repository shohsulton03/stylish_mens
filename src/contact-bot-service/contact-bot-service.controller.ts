import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactBotServiceController {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN_2') || '';
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') || '';
  
    if (!token || !this.chatId) {
      throw new Error('❌ Telegram token yoki chat ID yetishmayapti.');
    }
  
    // Botni node-telegram-bot-api bilan yaratish
    this.bot = new TelegramBot(token, { polling: true });
  }
  
  async sendMessage(message: string) {
    try {
      // Xabarni yuborish
      await this.bot.sendMessage(this.chatId, message);
      return '✅ Xabar yuborildi!';
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
      throw new Error('Telegram xabar yuborishda muammo yuz berdi.');
    }
  }
}
