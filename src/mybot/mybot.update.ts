import { Ctx, Start, Update } from "nestjs-telegraf";
import { MybotService } from "./mybot.service";
import { Context } from "telegraf";

@Update()
export class MyBotUpdate {
  constructor(private readonly myBotService: MybotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.myBotService.start(ctx);
  }
}