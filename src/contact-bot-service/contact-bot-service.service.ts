// import { Injectable } from '@nestjs/common';
// import * as TelegramBot from 'node-telegram-bot-api';
// import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

// @Injectable()
// export class ContactBotServiceService {
//   private bot: TelegramBot;
//   private chatId: string;

//   constructor() {
//     const token = process.env.TELEGRAM_BOT_TOKEN_2;
//     const chatId = process.env.TELEGRAM_CHAT_ID_2;

//     if (!token || !chatId) {
//       throw new Error('Telegram token or chat ID is missing');
//     }

//     // node-telegram-bot-api bilan botni yaratish
//     this.bot = new TelegramBot(token);
//     this.chatId = chatId as string;

//   }
//   async sendContactFormNotification(contactFormData: CreateContactFormDto) {
//     const message = `
// 📝 *New Contact Form Submission!*
// 👤 *Name:* ${contactFormData.name}
// 📞 *Phone Number:* ${contactFormData.phone_number}
// 📧 *Email:* ${contactFormData.email}
// 💬 *Comment:* ${contactFormData.comments}
//     `;
    
//     try {
//       const response = await this.bot.sendMessage(this.chatId, message);
//       console.log('Telegram response:', response);
//     } catch (error) {
//       console.error('❌ Error details:', error);
//       if (error.response) {
//         console.error('Telegram error response:', error.response.data);
//       }
//     }
//   }
// }


// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

// @Injectable()
// export class ContactBotServiceService {
//   private readonly telegramApiUrl: string;
//   private readonly chatId: string;

//   constructor() {
//     const token = process.env.TELEGRAM_BOT_TOKEN_2;
//     const chatId = process.env.TELEGRAM_CHAT_ID_2;

//     if (!token || !chatId) {
//       throw new Error('Telegram token or chat ID is missing');
//     }

//     this.telegramApiUrl = `https://api.telegram.org/bot${token}`;
//     this.chatId = chatId;
//   }

//   async sendContactFormNotification(contactFormData: CreateContactFormDto) {
//     const message = `
// 📝 *New Contact Form Submission!*
// 👤 *Name:* ${contactFormData.name}
// 📞 *Phone Number:* ${contactFormData.phone_number}
// 📧 *Email:* ${contactFormData.email}
// 💬 *Comment:* ${contactFormData.comments}
//     `;

//     try {
//       const response = await axios.post(`${this.telegramApiUrl}/sendMessage`, {
//         chat_id: this.chatId,
//         text: message,
//         parse_mode: 'Markdown',
//       });

//       console.log('✅ Telegram response:', response.data);
//     } catch (error) {
//       console.error('❌ Error sending Telegram message:', error.message);
//       if (error.response) {
//         console.error('📩 Telegram response error data:', error.response.data);
//       } else if (error.request) {
//         console.error('📡 No response received:', error.request);
//       } else {
//         console.error('🔧 Request setup error:', error.message);
//       }
//     }
    
//   }
// }


import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ContactBotServiceService {
  private readonly telegramApiUrl: string;
  private readonly chatId: string;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN_2;
    const chatId = process.env.TELEGRAM_CHAT_ID_2;

    if (!token || !chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

    this.telegramApiUrl = `https://api.telegram.org/bot${token}`;
    this.chatId = chatId;

    // Yagona axios instansiyasini yaratish
    this.axiosInstance = axios.create({
      baseURL: this.telegramApiUrl,
      timeout: 2000,  // 5 soniya vaqt cheklovi
    });
  }

  // Xabar yuborishdan oldin to‘liq tekshirish
  private validateContactForm(contactFormData: CreateContactFormDto) {
    if (!contactFormData.name || !contactFormData.phone_number || !contactFormData.email) {
      throw new HttpException('Barcha maydonlarni to‘ldiring', HttpStatus.BAD_REQUEST);
    }
  }

  async sendContactFormNotification(contactFormData: CreateContactFormDto) {
    this.validateContactForm(contactFormData);

    const message = `📝 *New Contact Form Submission!*
👤 *Name:* ${contactFormData.name}
📞 *Phone Number:* ${contactFormData.phone_number}
📧 *Email:* ${contactFormData.email}
💬 *Comment:* ${contactFormData.comments}`;

    try {
      const response = await this.axiosInstance.post('/sendMessage', {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'Markdown',
      });

      if (response.data && response.data.ok) {
        console.log('✅ Telegram response:', response.data);
      } else {
        throw new HttpException('Telegram xabar yuborishda xatolik', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.error('❌ Error sending Telegram message:', error.message);

      // Batafsil xatolikni qaytarish
      if (error.response) {
        console.error('📩 Telegram response error data:', error.response.data);
        throw new HttpException(error.response.data.description || 'Telegram xabar yuborishda xatolik', HttpStatus.INTERNAL_SERVER_ERROR);
      } else if (error.request) {
        console.error('📡 No response received:', error.request);
        throw new HttpException('Telegram serveridan javob olinmadi', HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        console.error('🔧 Request setup error:', error.message);
        throw new HttpException('Telegram xabar yuborishda nomalum xatolik', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

