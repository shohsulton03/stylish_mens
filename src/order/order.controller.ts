import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';


@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    status: 201,
    description: 'A new order has been successfully created',
    type: Order,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
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
