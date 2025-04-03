import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { TelegramService } from 'src/telegram_bot/telegram_bot.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private telegramService: TelegramService,

  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
        console.log('📦 Mahsulotlar:', createOrderDto.product_ts);

        // 🔹 `product_ts` JSON string bo‘lsa, arrayga aylantiramiz
        if (typeof createOrderDto.product_ts === 'string') {
            try {
                createOrderDto.product_ts = JSON.parse(createOrderDto.product_ts);
            } catch (error) {
                throw new BadRequestException('❌ Mahsulotlar noto‘g‘ri JSON formatda!');
            }
        }

        // 🔹 `product_ts` array ekanligini tekshirish
        if (!createOrderDto.product_ts || !Array.isArray(createOrderDto.product_ts)) {
            throw new BadRequestException('❌ Mahsulotlar noto‘g‘ri formatda yuborildi.');
        }

        // 🔹 Buyurtmani yaratish va bazaga saqlash
        const order = this.orderRepo.create(createOrderDto);
        const savedOrder = await this.orderRepo.save(order);

        if (!savedOrder.id) {
            throw new Error('Buyurtma bazaga saqlanmadi');
        }

        // 🔹 Telegramga xabar yuborish
        await this.telegramService.sendOrderNotification(savedOrder); // ✅ TO‘G‘RI CHAQRILGAN

        return savedOrder;
    } catch (error) {
        console.error('❌ Buyurtma yaratishda xatolik:', error.stack);
        throw new Error('Buyurtmani yaratishda muammo yuz berdi.');
    }
}


  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {

    const order = await this.orderRepo.findOne({where: { id }})

    if (!order) {
      throw new Error('Order not found ��️');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {

    const order = await this.orderRepo.findOne({ where: { id }})

    if (!order) {
      throw new Error('Order not found ��️');
    }

    Object.assign(order, updateOrderDto);

    await this.orderRepo.save(order);

    return order;
  }

  async remove(id: number) {

    const order = await this.orderRepo.findOne({ where: { id }});

    if (!order) {
      throw new BadGatewayException('Order not found ✖️');
    }

    await this.orderRepo.remove(order);

    return `Order with id ${id} has been deleted ✅`;
  }
}
