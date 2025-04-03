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
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilterProductDto } from "./dto/filter-product.dto";
import { AdminGuard } from "../common/guards/admin.guard";

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
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor("files", 10))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.productService.create(createProductDto, files);
  }

  @ApiOperation({ summary: "Get all data" })
  @ApiResponse({
    status: 200,
    description: "All product value",
    type: [Product],
  })
  @Get()
  findAll(@Query() filterProductDto: FilterProductDto) {
    return this.productService.findAll(filterProductDto);
  }

  @ApiOperation({ summary: "Get one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Get one by Id",
    type: Product,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Update by Id",
    type: Product,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor("files", 10))
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Array<any>
  ) {
    return this.productService.update(+id, updateProductDto, files);
  }

  @ApiOperation({ summary: "Delete one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Delete by Id",
    type: Object,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
