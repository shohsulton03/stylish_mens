import { Injectable } from '@nestjs/common';
import { BOT_NAME } from './app.constants';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class MybotService {
  constructor(@InjectBot(BOT_NAME) private bot: Telegraf<Context>) {}

  async start(ctx:Context) {
    const userId = ctx.from?.id;
    const adminId = Number(process.env.MY_CHAT_ID);
    if (userId !== adminId){
      await ctx.reply('Siz admin emassiz')
    }else {
      await ctx.reply('Salom admin')
    }
    this.bot.telegram.sendMessage(adminId, `Salom admin habar yubordim ${process.env.PORT}`)
  }
}
