import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private readonly colorRepo: Repository<Color>
  ) {}

  async create(createColorDto: CreateColorDto) {
    const color = await this.colorRepo.create(createColorDto);

    if(!color){
      throw new Error('Failed to create color');
    }

    await this.colorRepo.save(color);

    return color;
  }

  findAll() {
    return this.colorRepo.find();
  }

  async findOne(id: number) {

    const color = await this.colorRepo.findOne({ where: { id }});

    if (!color) {
      throw new Error('Color not found');
    }

    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {

    const color = await this.colorRepo.findOne({ where: { id }});

    if (!color) {
      throw new Error('Color not found');
    }

    Object.assign(color, updateColorDto);

    await this.colorRepo.save(color);

    return color;
  }

  async remove(id: number) {
    const color = await this.colorRepo.findOne({ where: { id }});

    if (!color) {
      throw new Error('Color not found');
    }

    await this.colorRepo.remove(color);

    return { message: 'Color deleted successfully ✅' };
  }
}
