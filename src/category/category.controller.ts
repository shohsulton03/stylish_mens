import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @ApiOperation({ summary: 'Add new category'})
  @ApiResponse({
    status: 201,
    description: 'A new category has been successfully created',
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: Request){
    return this.categoryService.create(createCategoryDto);
  }
       
  // Get all categories
  @ApiOperation({ summary: 'Get all categories'})
  @ApiResponse({
    status: 200,
    description: 'All categories have been successfully retrieved',
    type: [Category],
  }) 
  @Get()
  findAll(){
    return this.categoryService.findAll();
  }

  // Get a single category by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // Update a category by ID
  @ApiOperation({ summary: 'Update a category'})
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated',
    type: Category,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  // Delete a category by ID
  @ApiOperation({ summary: 'Delete a category'})
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
