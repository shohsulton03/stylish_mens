import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './entities/discount.entity';
import { AdminGuard } from '../common/guards/admin.guard';


@ApiTags("discount")
@Controller("discount")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({ summary: "Add new discount" })
  @ApiResponse({
    status: 201,
    description: "Add new discount",
    type: Discount,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: "Get all discounts" })
  @ApiResponse({
    status: 200,
    description: "Get all discounts",
    type: [Discount],
  })
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @ApiOperation({ summary: "Get discount by id" })
  @ApiResponse({
    status: 200,
    description: "Get discount by id",
    type: Discount,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.discountService.findOne(+id);
  }

  @ApiOperation({ summary: "Update discount by id" })
  @ApiResponse({
    status: 200,
    description: "Update discount by id",
    type: Discount,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @ApiOperation({ summary: "Delete discount by id" })
  @ApiResponse({
    status: 200,
    description: "Delete discount by id",
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.discountService.remove(+id);
  }
}
