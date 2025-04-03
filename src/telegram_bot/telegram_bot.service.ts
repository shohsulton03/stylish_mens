// import { Injectable } from '@nestjs/common';
// import { Telegraf } from 'telegraf';
// import { ConfigService } from '@nestjs/config';
// import { CreateOrderDto } from '../order/dto/create-order.dto';

// @Injectable()
// export class TelegramService {
//   private bot: Telegraf;
//   private chatId: string;

//   constructor(private configService: ConfigService) {
//     const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
//     const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

//     if (!token || !chatId) {
//       throw new Error('Telegram token or chat ID is missing');
//     }

//     this.bot = new Telegraf(token);
//     this.chatId = chatId as string;
//   }

//   async sendOrderNotification(order: CreateOrderDto) {
//     let totalPrice = 0; // Umumiy narxni hisoblash uchun

//     const message = `
//   🛒 *New Order!*
//   👤 *Full Name:* ${order.full_name}
//   📞 *Phone Number:* ${order.phone_number}
//   📧 *Email:* ${order.email}
//   🌍 *Country:* ${order.country}
//   🏙️ *City:* ${order.city}
//   📲 *WhatsApp Number:* ${order.whatsapp_number}
  
//   📦 *Products:*
//   ${order.product_ts && order.product_ts.length > 0
//     ? order.product_ts.map((product) => {

//         const price = parseFloat(product.price); // Narxni numberga aylantirish
//         const quantity = parseInt(product.quantity, 10); // Miqdorni numberga aylantirish
//         const totalProductPrice = price * quantity; // Har bir mahsulot uchun umumiy narxni hisoblash

//         totalPrice += totalProductPrice;
//         return `
//   - 🏷️ *Product Title:* ${product.title}
//   - 📝 *Description:* ${product.description}
//   - 💵 *Price:* ${price.toFixed(2)} UZS
//   - 📦 *Quantity:* ${quantity}
//   - 🏷️ *Category:* ${product.category ? product.category.name : 'No category'}
//   - 🎨 *Colors:* ${product.colors.length > 0 ? product.colors.map(color => color.color).join(', ') : 'No colors'}
//   - 🔲 *Sizes:* ${product.sizes.length > 0 ? product.sizes.map(size => size.size).join(', ') : 'No sizes'}
//   - 💸 *Discount:* ${product.discount ? product.discount.discount : 'No discount'}
//   - 🧵 *Material:* ${product.material ? JSON.stringify(product.material) : 'No material information'}
//   - 💰 *Total Price for Product:* ${(totalProductPrice).toFixed(2)} UZS
//   `;
//       }).join('\n')
//     : 'No products available'}
    
//   💰 *Total Price for Order:* ${totalPrice.toFixed(2)} UZS
//   `;

//     try {
//       await this.bot.telegram.sendMessage(this.chatId, message, {
//         parse_mode: "Markdown",
//       });
//     } catch (error) {
//       console.error("Error sending message to Telegram:", error);
//     }

//   }
// }



import { Injectable } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { ConfigService } from "@nestjs/config";
import { CreateOrderDto } from "../order/dto/create-order.dto";

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>("TELEGRAM_BOT_TOKEN");
    const chatId = this.configService.get<string>("TELEGRAM_CHAT_ID");

    if (!token || !chatId) {
      throw new Error("Telegram token or chat ID is missing");
    }

    this.bot = new Telegraf(token);
    this.chatId = chatId as string;
  }

  async sendOrderNotification(order: CreateOrderDto) {
    let totalPrice = 0; // Umumiy narxni hisoblash uchun

    const message = `🛒 *New Order!*
      👤 *Full Name:* ${order.full_name}
      📞 *Phone Number:* ${order.phone_number}
      📧 *Email:* ${order.email}
      🌍 *Country:* ${order.country}
      🏙️ *City:* ${order.city}
      📲 *WhatsApp Number:* ${order.whatsapp_number}
      
      📦 *Products:*
      ${
        order.product_ts && order.product_ts.length > 0
          ? order.product_ts
              .map((product) => {
                const price = parseFloat(product.price); // Narxni numberga aylantirish
                const quantity = parseInt(product.quantity, 10); // Miqdorni numberga aylantirish
                const totalProductPrice = price * quantity; // Har bir mahsulot uchun umumiy narxni hisoblash

                totalPrice += totalProductPrice;
                return `
      - 🏷️ *Product Title:* ${product.title}
      - 📝 *Description:* ${product.description}
      - 💵 *Price:* ${price.toFixed(2)} UZS
      - 📦 *Quantity:* ${quantity}
      - 🏷️ *Category:* ${product.category ? product.category.name : "No category"}
      - 🎨 *Colors:* ${product.colors.length > 0 ? product.colors.map((color) => color.color).join(", ") : "No colors"}
      - 🔲 *Sizes:* ${product.sizes.length > 0 ? product.sizes.map((size) => size.size).join(", ") : "No sizes"}
      - 💸 *Discount:* ${product.discount ? product.discount.discount : "No discount"}
      - 🧵 *Material:* ${product.material ? JSON.stringify(product.material) : "No material information"}
      - 💰 *Total Price for Product:* ${totalProductPrice.toFixed(2)} UZS
      `;
              })
              .join("\n")
          : "No products available"
      }
        
    💰 *Total Price for Order:* ${totalPrice.toFixed(2)} UZS`;

    const sendMessage = async (retries: number = 3) => {
      try {
        await this.bot.telegram.sendMessage(this.chatId, message, {
          parse_mode: "Markdown",
        });
      } catch (error) {
        if (retries > 0) {
          console.error("Error sending message, retrying...", error);
          await new Promise((res) => setTimeout(res, 5000)); // 5 sekund kutish
          await sendMessage(retries - 1); // qayta urinish
        } else {
          console.error("Failed to send message after retries", error);
        }
      }
    };

    await sendMessage(); // Xabarni yuborish
  }
}
