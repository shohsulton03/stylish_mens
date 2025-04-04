import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { name: createCategoryDto.name } });

    if(category) {
      throw new Error('Category with this name already exists');
    }

    const newCategory = await this.categoryRepo.create(createCategoryDto);

    return this.categoryRepo.save(newCategory);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = this.categoryRepo.findOne({
      where: { id }    });

    if(!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id }})

    if(!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    } 

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({where: { id }});

    if(!category) {
      throw new BadGatewayException(`Category with id ${id} not found ✖️`);
    }

    await this.categoryRepo.remove(category);

    return { message: 'Category deleted successfully ✅'};

  }
}
