import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Size } from './entities/size.entity';
import { AdminGuard } from '../common/guards/admin.guard';


@ApiTags("sizes")
@Controller("sizes")
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @ApiOperation({ summary: "Add new size" })
  @ApiResponse({
    status: 201,
    description: "Add new size",
    type: Size,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @ApiOperation({ summary: "Get all sizes" })
  @ApiResponse({
    status: 200,
    description: "Get all sizes",
    type: [Size],
  })
  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @ApiOperation({ summary: "Get a single size by ID" })
  @ApiResponse({
    status: 200,
    description: "Get a single size by ID",
    type: Size,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sizesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a size by ID" })
  @ApiResponse({
    status: 200,
    description: "Update a size by ID",
    type: Size,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizesService.update(+id, updateSizeDto);
  }

  @ApiOperation({ summary: "Delete a size by ID" })
  @ApiResponse({
    status: 200,
    description: "Delete a size by ID",
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sizesService.remove(+id);
  }
}
