import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepo.create(createOrderDto)

    if(!order) {
      throw new Error('Failed to create order');
    }

    await this.orderRepo.save(order);

    return order;
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
