import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID') || '';

    if (!token || !this.chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

  }

  // ✅ Telegramga xabar yuborish funktsiyasi
  async sendOrderNotification(order: CreateOrderDto) {
    let totalPrice = 0; // Umumiy narxni hisoblash uchun

    const message = `
  🛒 *Yangi Buyurtma!*
  👤 *Ism:* ${order.full_name}
  📞 *Telefon:* ${order.phone_number}
  📧 *Email:* ${order.email}
  🌍 *Davlat:* ${order.country}
  🏙 *Shahar:* ${order.city}
  📲 *WhatsApp:* ${order.whatsapp_number}

  📦 *Mahsulotlar:*
  ${order.product_ts && order.product_ts.length > 0
    ? order.product_ts.map((product) => {

        const price = parseFloat(product.price); // Narxni numberga aylantirish
        const quantity = parseInt(product.quantity, 10); // Miqdorni numberga aylantirish
        const totalProductPrice = price * quantity; // Har bir mahsulot uchun umumiy narxni hisoblash

        totalPrice += totalProductPrice;
        return `  
  - 🏷 *Mahsulot nomi:* ${product.title}
  - 📝 *Tavsif:* ${product.description || 'Mavjud emas'}
  - 💵 *Narxi:* ${price.toFixed(2)} UZS
  - 📦 *Miqdori:* ${quantity}
  - 🏷 *Kategoriya:* ${product.category ? product.category.name_eng : 'Kategoriya yo‘q'}
  - 🎨 *Ranglar:* ${product.colors.length > 0 ? product.colors.map(color => color.color_eng).join(', ') : 'Mavjud emas'}
  - 🔲 *O‘lchamlar:* ${product.sizes.length > 0 ? product.sizes.map(size => size.size).join(', ') : 'Mavjud emas'}
  - 💸 *Chegirma:* ${product.discount ? product.discount.discount : 'Mavjud emas'}
  - 🧵 *Material:* ${product.material ? JSON.stringify(product.material) : 'Mavjud emas'}
  - 💰 *Umumiy narx:* ${(totalProductPrice).toFixed(2)} UZS
  `; 
      }).join('\n')
    : 'Mahsulotlar mavjud emas'}
  
  💰 *Buyurtma umumiy narxi:* ${totalPrice.toFixed(2)} UZS
  `;

    try {
      await this.bot.sendMessage(this.chatId, message);
      console.log('✅ Xabar muvaffaqiyatli yuborildi!');
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error.message);
    }
  }
}
