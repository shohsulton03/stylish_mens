import { Injectable } from "@nestjs/common";
import * as TelegramBot from "node-telegram-bot-api";
import { ConfigService } from "@nestjs/config";
import { CreateOrderDto } from "../order/dto/create-order.dto";

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID || "";

    if (!token || !this.chatId) {
      throw new Error("Telegram token or chat ID is missing");
    }

    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendOrderNotification(order: CreateOrderDto) {
    let totalPrice = 0;
  
    const messageParts: string[] = [];
  
    messageParts.push(`
  🛒 New Order!
  👤 Name: ${order.full_name}
  📞 Phone: ${order.phone_number}
  📧 Email: ${order.email}
  🌍 Country: ${order.country}
  🏙 City: ${order.city}
  📲 WhatsApp: ${order.whatsapp_number}
  
  📦 Products:
  `);
    if (order.product_ts && order.product_ts.length > 0) {
      for (const product of order.product_ts) {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity, 10);
        const discount = product.discount?.discount || 0;
        const discountedPrice = price * (1 - discount / 100);
        const totalProductPrice = discountedPrice * quantity;
  
        totalPrice += totalProductPrice;
         messageParts.push(`
  🏷 Product Name: ${product.title}
  💵 Price: ${discount > 0 ? `${price.toFixed(0)} $` : `${price.toFixed(0)} UZS`}
  📉 Discount: ${discount ? discount + '%' : 'No discount'}
  💸 Price After Discount: ${discount > 0 ? `${discountedPrice.toFixed(0)} $` : 'No discount'}
  📦 Quantity: ${quantity}
  🏷 Category: ${product.category ? product.category.name_en : 'No category'}
  🎨 Colors: ${Array.isArray(product.colors) && product.colors.length > 0 ? product.colors.map(c => c?.color_en || 'Unknown').join(', ') : 'Not available'}
  🔲 Sizes: ${Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes.map(s => s?.size || 'Unknown').join(', ') : 'Not available'}
  💰 Total Price: ${totalPrice.toFixed(0)} $`);
          
      }
    } else {
      messageParts.push('No products available');
    }
  
    // Yetkazib berish narxi hisoblanmoqda (agar kerak bo‘lsa)
    let deliveryFee = 0;
    if (totalPrice < 150) {
      deliveryFee = 10
      totalPrice += deliveryFee;
    }
  
    messageParts.push(`
  🚚 Delivery Fee: ${deliveryFee > 0 ? deliveryFee.toFixed(2) + ' $' : '0 UZS'}
  💰 Order Total: ${totalPrice.toFixed(0)} $
  `);
  
    const message = messageParts.join('\n');
  
    try {
      if (this.bot) {
        await this.bot.sendMessage(this.chatId, message);
        console.log('✅ Message sent successfully!');
      } else {
        throw new Error('Bot is not initialized.');
      }
    } catch (error) {
      console.error('❌ Error while sending Telegram message:', error.message);
    }
  }
}