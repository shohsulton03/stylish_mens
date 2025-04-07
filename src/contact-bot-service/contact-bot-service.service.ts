import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

@Injectable()
export class ContactBotServiceService {
  private readonly telegramApiUrl: string;
  private readonly chatId: string;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN_2;
    const chatId = process.env.TELEGRAM_CHAT_ID_2;

    if (!token || !chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

    this.telegramApiUrl = `https://api.telegram.org/bot${token}`;
    console.log(this.telegramApiUrl);
    this.chatId = chatId;
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
      const response = await axios.post(`${this.telegramApiUrl}/sendMessage`, {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'Markdown',
      }, { 
        timeout: 3000,
    });

      console.log('✅ Telegram response:', response.data);
    } catch (error) {
      console.error('❌ Error sending Telegram message:', error.message);

      if (error.response) {
        console.error('📩 Telegram response error status:', error.response.status);
        console.error('📩 Telegram response error data:', error.response.data);
      } else if (error.request) {
        console.error('📡 No response received from Telegram:', error.request);
      } else {
        console.error('🔧 Request setup error:', error.message);
      }
    }
  }
}
