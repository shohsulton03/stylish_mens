import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { TelegramModule } from 'src/telegram_bot/telegram_bot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TelegramModule],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
