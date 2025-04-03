import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './entities/color.entity';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("color")
@Controller("colors")
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiOperation({ summary: "Add newe color" })
  @ApiResponse({
    status: 201,
    description: "Add new color",
    type: Color,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @ApiOperation({ summary: "Get all colors" })
  @ApiResponse({
    status: 200,
    description: "Get all colors",
    type: [Color],
  })
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @ApiOperation({ summary: "Get color by id" })
  @ApiResponse({
    status: 200,
    description: "Get color by id",
    type: Color,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.colorsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update color by id" })
  @ApiResponse({
    status: 200,
    description: "Update color by id",
    type: Color,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(+id, updateColorDto);
  }

  @ApiOperation({ summary: "Delete color by id" })
  @ApiResponse({
    status: 200,
    description: "Delete color by id",
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.colorsService.remove(+id);
  }
}
