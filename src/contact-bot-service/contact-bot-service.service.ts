import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

@Injectable()
export class ContactBotServiceService {
  private bot: Telegraf;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN_2');
    const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID_2');

    if (!token || !chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

    this.bot = new Telegraf(token);
    this.chatId = chatId as string;
  }

  async sendContactFormNotification(contactFormData: CreateContactFormDto) {
    // Admin botga yuboriladigan xabar
    const message = `
📝 *New Contact Form Submission!*
👤 *Name:* ${contactFormData.name}
📞 *Phone Number:* ${contactFormData.phone_number}
📧 *Email:* ${contactFormData.email}
💬 *Comment:* ${contactFormData.comments}
    `;
    
    // Xabarni admin chatga yuborish
    await this.bot.telegram.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
  }
}
