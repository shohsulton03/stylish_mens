import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilterProductDto } from "./dto/filter-product.dto";

@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "Add new product" })
  @ApiResponse({
    status: 201,
    description: "Added",
    type: Product,
  })
  @UseInterceptors(FilesInterceptor("files", 10))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.productService.create(createProductDto, files);
  }

  @Get()
  findAll(@Query() filterProductDto: FilterProductDto) {
    return this.productService.findAll(filterProductDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseInterceptors(FilesInterceptor("files", 10))
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.productService.update(+id, updateProductDto, files);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
