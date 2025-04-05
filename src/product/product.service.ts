import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Like, Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Color } from '../colors/entities/color.entity';
import { Size } from '../sizes/entities/size.entity';
import { Discount } from '../discount/entities/discount.entity';
import { FileService } from '../file/file.service';
import { FilterProductDto } from './dto/filter-product.dto';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Size) private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    private readonly fileService: FileService
  ) {}

  async create(createProductDto: CreateProductDto, files: Array<any>) {
    const categorry = await this.categoryRepository.findOne({
      where: { id: createProductDto.category_id },
    });

    if (!categorry) {
      throw new BadRequestException("Category not found");
    }

    const colors = await this.colorRepository.findBy({
      id: In(createProductDto.colors_id),
    });

    if (colors.length !== createProductDto.colors_id.length) {
      throw new BadRequestException("Some colors are not found");
    }

    const sizes = await this.sizeRepository.findBy({
      id: In(createProductDto.sizes_id),
    });

    if (sizes.length !== createProductDto.sizes_id.length) {
      throw new Error("Some sizes are not found");
    }

    let discount: Discount | null = null;
    if (createProductDto.discount_id) {
      discount = await this.discountRepository.findOne({
        where: { id: createProductDto.discount_id },
      });
    }

    if (createProductDto.discount_id && !discount) {
      throw new BadRequestException("Discount not found");
    }

    const materials =
      typeof createProductDto.materials === "string"
        ? JSON.parse(createProductDto.materials)
        : createProductDto.materials;


    const fileUpload = await Promise.all(
      files.map((file) => this.fileService.saveFile(file))
    );

    console.log(`${fileUpload}  cdksmvlkfmvslfkvmsk'mfvd'fklv`);
    

    const product = new Product();
    product.title_eng = createProductDto.title_eng;
    product.title_de = createProductDto.title_de;
    product.title_ru = createProductDto.title_ru;
    product.description_de = createProductDto.description_de;
    product.description_eng = createProductDto.description_de;
    product.description_ru = createProductDto.description_ru;
    product.price = createProductDto.price;
    product.category = categorry;
    product.category_id = createProductDto.category_id;
    product.colors = colors;
    product.sizes = sizes;
    product.images = fileUpload
    product.materials = materials;
    product.discount = discount;
    product.discount_id = createProductDto.discount_id;

    await this.productRepository.save(product);

    return product;
  }

  async findAll(filterProductDto: FilterProductDto) {
    const {
      title_de,
      title_ru,
      title_eng,
      category_id,
      sizes_id,
      colors_id,
      page = 1,
      limit = 10,
    } = filterProductDto;

    const skip = (page - 1) * limit;
    const take = limit;

    const filterConditions: any = {};

    if (title_de) {
      filterConditions.title = Like(`%${title_de}%`);
    }

    if (title_eng) {
      filterConditions.title = Like(`%${title_eng}%`);
    }

    if (title_ru) {
      filterConditions.title = Like(`%${title_ru}%`);
    }

    if (category_id) {
      filterConditions.category_id = category_id;
    }

    if (sizes_id) {
      filterConditions.sizes = In(sizes_id);
    }

    if (colors_id) {
      filterConditions.colors = In(colors_id);
    }

    const [products, total] = await this.productRepository.findAndCount({
      where: filterConditions,
      relations: {
        category: true,
        colors: true,
        sizes: true,
        discount: true,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        colors: true,
        sizes: true,
        discount: true,
      },
    });

    if (!product) {
      throw new BadRequestException("Product not found");
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files?: Array<any>
  ) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException("Product not found");
    }

    if (updateProductDto.category_id) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.category_id },
      });
      if (!category) {
        throw new BadRequestException("Category not found");
      }
      product.category = category;
      product.category_id = updateProductDto.category_id;
    }

    if (updateProductDto.colors_id) {
      const colors = await this.colorRepository.findBy({
        id: In(updateProductDto.colors_id),
      });
      if (colors.length !== updateProductDto.colors_id.length) {
        throw new BadRequestException("Some colors are not found");
      }
      product.colors = colors;
    }

    if (updateProductDto.sizes_id) {
      const sizes = await this.sizeRepository.findBy({
        id: In(updateProductDto.sizes_id),
      });
      if (sizes.length !== updateProductDto.sizes_id.length) {
        throw new BadRequestException("Some sizes are not found");
      }
      product.sizes = sizes;
    }

    if (updateProductDto.discount_id !== undefined) {
      let discount: Discount | null = null;
      if (updateProductDto.discount_id) {
        discount = await this.discountRepository.findOne({
          where: { id: updateProductDto.discount_id },
        });
      }
      if (updateProductDto.discount_id && !discount) {
        throw new BadRequestException("Discount not found");
      }
      product.discount = discount;
      product.discount_id = updateProductDto.discount_id;
    }

    if (updateProductDto.materials) {
      product.materials =
        typeof updateProductDto.materials === "string"
          ? JSON.parse(updateProductDto.materials)
          : updateProductDto.materials;
    }

    if (files && files.length > 0) {
      await Promise.all(
        product.images.map((img) => this.fileService.deleteFile(img))
      );
      product.images = await Promise.all(
        files.map((file) => this.fileService.saveFile(file))
      );
    }

    await this.productRepository.save(product);

    return product;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    await product.images.map((img) => this.fileService.deleteFile(img));
    await this.productRepository.remove(product);
    return `This action removes a #${id} product`;
  }
}
