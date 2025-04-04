import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN') as string;
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') as string;

    if (!token) throw new Error('❌ TELEGRAM_BOT_TOKEN yetishmayapti.');
    if (!this.chatId) throw new Error('❌ TELEGRAM_CHAT_ID yetishmayapti.');

    this.bot = new TelegramBot(token, { polling: false });

    // ✅ Webhook o‘rnatish
    const webhookUrl = this.configService.get<string>('TELEGRAM_WEBHOOK_URL') || '';
    if (webhookUrl) {
      this.bot.setWebHook(`${webhookUrl}/telegram/webhook`).catch((err) => {
        console.error('❌ Webhook o‘rnatishda xatolik:', err.message);
      });
    }
  }

  // ✅ Telegramga xabar yuborish funktsiyasi
  async sendMessage(message: string) {
    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
      return '✅ Xabar muvaffaqiyatli yuborildi!';
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
      if (error.response) {
        console.error('📌 Batafsil xato tafsilotlari:', error.response.body);
      }
      throw new Error('❌ Telegram xabar yuborilmadi. Iltimos, qayta urinib ko‘ring.');
    }
  }
}
