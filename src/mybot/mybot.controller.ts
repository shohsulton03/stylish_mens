import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MybotService } from './mybot.service';
import { CreateMybotDto } from './dto/create-mybot.dto';
import { UpdateMybotDto } from './dto/update-mybot.dto';

@Controller('mybot')
export class MybotController {
  constructor(private readonly mybotService: MybotService) {}

  @Post()
  create(@Body() createMybotDto: CreateMybotDto) {
    return this.mybotService.create(createMybotDto);
  }

  @Get()
  findAll() {
    return this.mybotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mybotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMybotDto: UpdateMybotDto) {
    return this.mybotService.update(+id, updateMybotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mybotService.remove(+id);
  }
}
