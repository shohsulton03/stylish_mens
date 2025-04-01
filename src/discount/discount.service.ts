import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountService {

  constructor(
    @InjectRepository(Discount) private readonly discountRepo: Repository<Discount>,
  ) {}

  // Create a new Discount
  async create(createDiscountDto: CreateDiscountDto) {
    const discount = this.discountRepo.create(createDiscountDto);

    if(!discount) {
      throw new Error('Failed to create discount ��️');
    }
    
    await this.discountRepo.save(discount);  
    
    return discount;
  }

  // Fetch all Discounts
  findAll() {
    return this.discountRepo.find();
  }


  // Fetch a single Discount by ID
  async findOne(id: number) {

    const discount = this.discountRepo.findOne({where: { id }})

    if (!discount) {
      throw new Error('Discount not found ✖️');
    }

    return discount;
    
  }


  // Update a Discount by ID
  async update(id: number, updateDiscountDto: UpdateDiscountDto) {

    const discount = await this.discountRepo.findOne({ where: { id}});

    if (!discount) {
      throw new Error('Discount not found ✖️');
    }

    Object.assign(discount, updateDiscountDto);

    await this.discountRepo.save(discount);
    
    return discount;

  }

  // Delete a Discount by ID
  async remove(id: number) {

    const discount = await this.discountRepo.findOne({ where: { id }});

    if (!discount) {
      throw new Error('Discount not found ��️');
    }

    await this.discountRepo.remove(discount);
    
    return `Discount with ID ${id} has been deleted successfully`;
  }
}
