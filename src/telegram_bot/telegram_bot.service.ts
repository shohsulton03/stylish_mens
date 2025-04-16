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
      throw new Error("Telegram token yoki chat ID yo'q");
    }

    this.bot = new TelegramBot(token, { polling: false });
  }

  async sendOrderNotification(order: CreateOrderDto) {
    let totalPrice = 0; 
    const messageParts: string[] = [];

    messageParts.push(`
🛒 New Order!
👤 Name: ${order.full_name}
📞 Phone-number: ${order.phone_number}
📧 Email: ${order.email}
🌍 Country: ${order.country}
🏙 City: ${order.city}
📲 WhatsApp-number: ${order.whatsapp_number}

📦 Products:
`);

    if (order.product_ts && order.product_ts.length > 0) {
      for (const product of order.product_ts) {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity, 10);
        const discount = product.discount?.discount || 0;
        const discountedPrice = price * (1 - discount / 100);
        const totalProductPrice = discountedPrice * quantity;

        messageParts.push(`
🏷 Product-name: ${product.title_en}
💵 Price: ${discount > 0 ? `${price.toFixed(0)} $` : `${price.toFixed(0)} $`}
📉 Discount: ${discount ? discount + "%" : "No discount"}
💸 Discount-price: ${discount > 0 ? `${discountedPrice.toFixed(1)} $` : "No discount"}
📦 Quantity: ${quantity}
🏷 Category: ${product.category ? product.category.name_en : "Np category"}
🎨 Color: ${product.colors || "Not available"}
🔲 Sizes: ${product.sizes || "Not available"}
💰 Product total price: ${totalProductPrice.toFixed(2)} $
`);

        // Faqat yakuniy umumiy narxni yangilash
        if (!isNaN(totalProductPrice)) {
          totalPrice += totalProductPrice;
        }
      }
    } else {
      messageParts.push("Mahsulotlar mavjud emas");
    }

    // Yetkazib berish haqi hisoblanmoqda (agar kerak bo‘lsa)
    let deliveryFee = 0;
    if (totalPrice < 150) {
      deliveryFee = 10;
      totalPrice += deliveryFee;
    }

    messageParts.push(`
💰 Total Order Price: ${totalPrice.toFixed(2)} $
`);

    const message = messageParts.join("\n");

    try {
      if (this.bot) {
        await this.bot.sendMessage(this.chatId, message);
        console.log("✅ Xabar muvaffaqiyatli yuborildi!");
      } else {
        throw new Error("Bot inicializatsiya qilinmagan.");
      }
    } catch (error) {
      console.error("❌ Telegram xabari yuborishda xato:", error.message);
    }
  }
}
