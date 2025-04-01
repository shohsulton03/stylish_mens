import { BadGatewayException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizesService {

  constructor(
    @InjectRepository(Size) private readonly sizeRepo: Repository<Size>
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const size = this.sizeRepo.create(createSizeDto)

    if(!size){
      throw new Error('Failed to create size');
    }

    await this.sizeRepo.save(size);  
    
    return size;
  }

  findAll() {
    return this.sizeRepo.find();
  }

  async findOne(id: number) {

    const size = await this.sizeRepo.findOne({where: { id }})

    if (!size) {
      throw new Error('Size not found ��️');
    }

    return size;

  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {

    const size = await this.sizeRepo.findOne({ where: { id }})

    if (!size) {
      throw new Error('Size not found ��️');
    }

    Object.assign(size, updateSizeDto);
    await this.sizeRepo.save(size);

    return size;
  }

  async remove(id: number) {
  
      const discount = await this.sizeRepo.findOne({ where: { id }});
  
      if (!discount) {
        throw new  BadGatewayException('Size not found ✖️');
      }
  
      await this.sizeRepo.remove(discount);
      
      return `Discount with ID ${id} has been deleted successfully`;
    }

}
