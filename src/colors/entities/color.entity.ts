import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("color")
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  color_en: string;

  @Column({ type: "varchar" })
  color_ru: string;

  @Column({ type: "varchar" })
  color_de: string;

  @ManyToMany(() => Product, (product) => product.colors)
  products: Product[];
}
