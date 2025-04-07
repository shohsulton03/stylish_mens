import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID || '';

    if (!token || !this.chatId) {
      throw new Error('Telegram token or chat ID is missing');
    }

    this.bot = new TelegramBot(token, { polling: false });

  }

  // ✅ Telegramga xabar yuborish funktsiyasi
  // ✅ Telegramga tozalangan xabar yuborish funktsiyasi
async sendOrderNotification(order: CreateOrderDto) {
  let totalPrice = 0;

  const message = `
🛒 New Order!
👤 Name: ${order.full_name}
📞 Phone: ${order.phone_number}
📧 Email: ${order.email}
🌍 Country: ${order.country}
🏙 City: ${order.city}
📲 WhatsApp: ${order.whatsapp_number}

📦 Products:
${order.product_ts && order.product_ts.length > 0
  ? order.product_ts.map((product) => {
      const price = parseFloat(product.price);
      const quantity = parseInt(product.quantity, 10);
      const totalProductPrice = price * quantity;

      totalPrice += totalProductPrice;

      return `
- 🏷 Product Name: ${product.title}
- 📝 Description: ${product.description || 'Not available'}
- 💵 Price: ${price.toFixed(2)} UZS
- 📦 Quantity: ${quantity}
- 🏷 Category: ${product.category ? product.category.name_eng : 'No category'}
- 🎨 Colors: ${product.colors.length > 0 ? product.colors.map(c => c.color_eng).join(', ') : 'Not available'}
- 🔲 Sizes: ${product.sizes.length > 0 ? product.sizes.map(s => s.size).join(', ') : 'Not available'}
- 💸 Discount: ${product.discount ? product.discount.discount : 'Not available'}
- 🧵 Material: ${product.material ? JSON.stringify(product.material) : 'Not available'}
- 💰 Total Price: ${totalProductPrice.toFixed(2)} UZS`;
    }).join('\n')
  : 'No products available'}

💰 Order Total: ${totalPrice.toFixed(2)} UZS
`;

  try {
    if (this.bot) {
      await this.bot.sendMessage(this.chatId, message); // ❌ parse_mode yo'q!
      console.log('✅ Message sent successfully!');
    } else {
      throw new Error('Bot is not initialized.');
    }
  } catch (error) {
    console.error('❌ Error while sending Telegram message:', error.message);
  }
}

}
