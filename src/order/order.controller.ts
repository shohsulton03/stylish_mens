import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { TelegramService } from 'src/telegram_bot/telegram_bot.service';


@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly telegramService: TelegramService,
  
  ) {}

  
  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    status: 201,
    description: 'A new order has been successfully created',
    type: Order,
  })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
        console.log("✅ Buyurtma olindi:", createOrderDto);

        const newOrder = await this.orderService.create(createOrderDto);

        console.log("📌 Bazaga saqlandi:", newOrder);

        // await this.telegramService.sendOrderNotification(newOrder);

        return {
            success: true,
            message: 'Buyurtma qabul qilindi va Telegramga yuborildi!',
            data: newOrder,
        };
    } catch (error) {
        console.error('❌ Xatolik:', error.message);
        throw new BadRequestException('Buyurtmani yaratishda xatolik yuz berdi!');
    }
}



  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'All orders have been successfully retrieved',
    type: [Order],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }


  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: 200,
    description: 'Get order by id',
    type: Order,
  })  // Get a single order by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }


  @ApiOperation({ summary: 'Update order by id' })
  @ApiResponse({
    status: 200,
    description: 'Update order by id',
    type: Order,
  })  // Update a order by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }


  @ApiOperation({ summary: 'Delete order by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete order by id',
  })  // Delete a order by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
