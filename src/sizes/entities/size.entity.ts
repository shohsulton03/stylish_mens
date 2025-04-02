import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}
