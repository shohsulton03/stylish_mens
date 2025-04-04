import { Injectable } from "@nestjs/common";
import * as TelegramBot from "node-telegram-bot-api";
import { ConfigService } from "@nestjs/config";
import { CreateOrderDto } from "../order/dto/create-order.dto";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;
  private webhookUrl: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    const token = this.configService.get<string>("TELEGRAM_BOT_TOKEN");
    this.chatId = this.configService.get<string>("TELEGRAM_CHAT_ID") || "";
    this.webhookUrl =
      this.configService.get<string>("TELEGRAM_WEBHOOK_URL") || "";

    if (!token) throw new Error("❌ TELEGRAM_BOT_TOKEN yetishmayapti.");
    if (!this.chatId) throw new Error("❌ TELEGRAM_CHAT_ID yetishmayapti.");
    if (!this.webhookUrl)
      throw new Error("❌ TELEGRAM_WEBHOOK_URL yetishmayapti.");

    this.bot = new TelegramBot(token, { polling: false });

    // ✅ Webhookni o‘rnatish (xatolik bo‘lsa, dasturni to‘xtatmaydi)
    this.bot.setWebHook(`${this.webhookUrl}/telegram/webhook`).catch((err) => {
      console.error("❌ Webhook o‘rnatishda xatolik:", err.message);
    });
  }

  // ✅ Buyurtma haqida xabar yuborish
  async sendOrderNotification(order: CreateOrderDto) {
    let totalPrice = 0;
    let productDetails = "";

    if (order.product_ts && order.product_ts.length > 0) {
      productDetails = order.product_ts
        .map((product) => {
          const price = parseFloat(product.price);
          const quantity = parseInt(product.quantity, 10);
          const totalProductPrice =
            !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;
          totalPrice += totalProductPrice;

          return `
📌 *Mahsulot:* ${product.title}
📝 *Tavsif:* ${product.description || "Mavjud emas"}
💵 *Narxi:* ${!isNaN(price) ? price.toFixed(2) : "Noma‘lum"} UZS
📦 *Miqdori:* ${!isNaN(quantity) ? quantity : "Noma‘lum"}
🏷 *Kategoriya:* ${product.category?.name || "Kategoriya yo‘q"}
🎨 *Ranglar:* ${product.colors?.length > 0 ? product.colors.map((c) => c.color).join(", ") : "Mavjud emas"}
🔲 *O‘lchamlar:* ${product.sizes?.length > 0 ? product.sizes.map((s) => s.size).join(", ") : "Mavjud emas"}
💸 *Chegirma:* ${product.discount?.discount || "Mavjud emas"}
🧵 *Material:* ${product.material || "Ma‘lumot yo‘q"}
💰 *Umumiy narx:* ${totalProductPrice.toFixed(2)} UZS
        `;
        })
        .join("\n");
    } else {
      productDetails = "📌 Mahsulotlar ro‘yxati mavjud emas.";
    }

    const message = `
🛒 *Yangi Buyurtma!*
👤 *Ism:* ${order.full_name}
📞 *Telefon:* ${order.phone_number}
📧 *Email:* ${order.email}
🌍 *Davlat:* ${order.country}
🏙 *Shahar:* ${order.city}
📲 *WhatsApp:* ${order.whatsapp_number}

📦 *Mahsulotlar:*
${productDetails}

💰 *Umumiy buyurtma narxi:* ${totalPrice.toFixed(2)} UZS
    `;

    try {
      console.log("📨 Telegram xabar yuborilmoqda...");
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: "Markdown",
      });
      console.log("✅ Xabar muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("❌ Telegram xabar yuborishda xatolik:", error.message);
      if (error.response) {
        console.error("📌 Batafsil xato tafsilotlari:", error.response.body);
      }

      // Webhookga yuborilgan xatoliklarni tekshirish
      if (error.code === "EFATAL") {
        console.error("📌 AggregateError xatosi yuz berdi.");
        // Xatolikni qayta ishlash yoki boshqa imkoniyatlarni tekshirib ko‘rish
      }
    }
  }
}
