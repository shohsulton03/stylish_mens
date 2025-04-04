import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

@Injectable()
export class ContactBotServiceService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN_2');
    const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID_2');

    if (!token || !chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

    // node-telegram-bot-api bilan botni yaratish
    this.bot = new TelegramBot(token);
    this.chatId = chatId as string;

    // Webhookni sozlash
    const url = 'https://ngrok.com/r/iep/webhook';  // O'zingizning domain va pathni kiriting
    this.bot.setWebHook(url);
  }

  async sendContactFormNotification(contactFormData: CreateContactFormDto) {
    const message = `
📝 *New Contact Form Submission!*
👤 *Name:* ${contactFormData.name}
📞 *Phone Number:* ${contactFormData.phone_number}
📧 *Email:* ${contactFormData.email}
💬 *Comment:* ${contactFormData.comments}
    `;
    
    try {
      const response = await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
      console.log('Telegram response:', response);
    } catch (error) {
      console.error('❌ Error details:', error);
      if (error.response) {
        console.error('Telegram error response:', error.response.data);
      }
    }
  }
}
