import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name_en: string;

  @Column({ type: "varchar" })
  name_ru: string;

  @Column({ type: "varchar" })
  name_de: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
