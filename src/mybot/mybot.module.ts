import { Module } from '@nestjs/common';
import { MybotService } from './mybot.service';
import { MyBotUpdate } from './mybot.update';

@Module({
  controllers: [],
  providers: [MybotService, MyBotUpdate],
  exports: [MybotService]
})
export class MybotModule {}
