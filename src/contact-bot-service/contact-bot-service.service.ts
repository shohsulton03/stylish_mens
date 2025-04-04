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
    this.bot = new TelegramBot(token, { polling: true });
    this.chatId = chatId as string;
  }

  async sendContactFormNotification(contactFormData: CreateContactFormDto) {
    const message = `
📝 *New Contact Form Submission!*
👤 *Name:* ${contactFormData.name}
📞 *Phone Number:* ${contactFormData.phone_number}
📧 *Email:* ${contactFormData.email}
💬 *Comment:* ${contactFormData.comments}
    `;

    const attemptToSendMessage = async (retries = 3) => {
      try {
        const response = await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
        console.log('Telegram response:', response);
      } catch (error) {
        console.error('❌ Error details:', error);
        if (error.response) {
          console.error('Telegram error response:', error.response.data);
        }
        
        if (retries > 0) {
          console.log(`Retrying... Attempts remaining: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay before retrying
          return attemptToSendMessage(retries - 1); // Retry the message
        } else {
          console.error('Failed to send message after multiple attempts.');
        }
      }
    };

    await attemptToSendMessage(); // Start with the first attempt
  }
}
