import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("color")
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  color: string;

  @ManyToMany(() => Product, (product) => product.colors)
  products: Product[];
}
