import { Module } from '@nestjs/common';
import { MybotService } from './mybot.service';
import { MybotController } from './mybot.controller';

@Module({
  controllers: [MybotController],
  providers: [MybotService],
})
export class MybotModule {}
