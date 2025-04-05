import { Injectable } from '@nestjs/common';
import { CreateMybotDto } from './dto/create-mybot.dto';
import { UpdateMybotDto } from './dto/update-mybot.dto';
import { BOT_NAME } from './app.constants';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class MybotService {
  constructor(@InjectBot(BOT_NAME) private bot: Telegraf<Context>) {}

  async start(ctx:Context) {
    
  }
}
