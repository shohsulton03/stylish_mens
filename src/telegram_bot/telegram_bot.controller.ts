import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api'; // node-telegram-bot-api kutubxonasini import qilish
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') || '';

    if (!token || !this.chatId) {
      throw new Error('❌ Telegram token yoki chat ID yetishmayapti.');
    }

    // node-telegram-bot-api yordamida botni sozlash
    this.bot = new TelegramBot(token, { polling: false }); // pollingni faollashtirdik
  }

  // xabar yuborish funktsiyasi
  async sendMessage(message: string) {
    try {
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'Markdown', // xabarni Markdown formatida yuborish
      });
      return '✅ Xabar yuborildi!';
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
      throw new Error('Telegram xabar yuborishda muammo yuz berdi.');
    }
  }
}
