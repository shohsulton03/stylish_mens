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
    let totalPrice = 0; // Umumiy narx

    const messageParts: string[] = [];

    messageParts.push(`
🛒 Yangi Buyurtma!
👤 Ism: ${order.full_name}
📞 Telefon: ${order.phone_number}
📧 Elektron pochta: ${order.email}
🌍 Mamlakat: ${order.country}
🏙 Shahar: ${order.city}
📲 WhatsApp: ${order.whatsapp_number}

📦 Mahsulotlar:
`);

    if (order.product_ts && order.product_ts.length > 0) {
      for (const product of order.product_ts) {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity, 10);
        const discount = product.discount?.discount || 0;
        const discountedPrice = price * (1 - discount / 100);
        const totalProductPrice = discountedPrice * quantity;

        // Faqat har bir mahsulotning umumiy narxini hisoblash, lekin totalPrice ni faqat yakuniy hisoblashda yangilaymiz
        messageParts.push(`
🏷 Mahsulot Nomi: ${product.title_en}
💵 Narx: ${discount > 0 ? `${price.toFixed(0)} $` : `${price.toFixed(0)} UZS`}
📉 Chegirma: ${discount ? discount + "%" : "Chegirma yo'q"}
💸 Chegirmali Narx: ${discount > 0 ? `${discountedPrice.toFixed(0)} $` : "Chegirma yo'q"}
📦 Soni: ${quantity}
🏷 Kategoriya: ${product.category ? product.category.name_en : "Kategoriya yo'q"}
🎨 Rang: ${product.colors || "Mavjud emas"}
🔲 O'lcham: ${product.sizes || "Mavjud emas"}
💰 Mahsulot Umumiy Narxi: ${totalProductPrice.toFixed(0)} $
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
🚚 Yetkazib berish haqi: ${deliveryFee > 0 ? deliveryFee.toFixed(2) + " $" : "0 UZS"}
💰 Buyurtma Umumiy Narxi: ${totalPrice.toFixed(0)} $
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
