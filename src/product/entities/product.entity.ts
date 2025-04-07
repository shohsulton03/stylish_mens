import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Discount } from "../../discount/entities/discount.entity";
import { Size } from "../../sizes/entities/size.entity";
import { Color } from "../../colors/entities/color.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title_en: string;

  @Column({ type: "varchar" })
  title_ru: string;

  @Column({ type: "varchar" })
  title_de: string;

  @Column({ type: "text" })
  description_en: string;

  @Column({ type: "text" })
  description_ru: string;

  @Column({ type: "text" })
  description_de: string;

  @Column({ type: "decimal" })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ type: "int" })
  category_id: number;

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable()
  sizes: Size[];

  @ManyToMany(() => Color, (color) => color.products)
  @JoinTable()
  colors: Color[];

  @Column({ type: "varchar", array: true })
  images: string[];

  @Column({ type: "json", nullable: true })
  materials: { [key: string]: string };

  @ManyToOne(() => Discount, (discount) => discount.products, {
    nullable: true,
  })
  @JoinColumn({ name: "discount_id" })
  discount: Discount | null;

  @Column({ type: "int", nullable: true })
  discount_id: number | null;

  @CreateDateColumn({ type: "timestamp"})
  created_at: Date;
}
