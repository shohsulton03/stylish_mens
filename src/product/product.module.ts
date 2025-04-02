import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "../category/entities/category.entity";
import { Color } from "../colors/entities/color.entity";
import { Size } from "../sizes/entities/size.entity";
import { Discount } from "../discount/entities/discount.entity";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Color, Size, Discount]),
    FileModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
