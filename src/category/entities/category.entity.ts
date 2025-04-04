import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name_eng: string;

  @Column({ type: "varchar" })
  name_ru: string;

  @Column({ type: "varchar" })
  name_de: string;

  @Column({
    type: "varchar",
    length: 2000,
    nullable: true,
  })
  description_eng: string;

  @Column({
    type: "varchar",
    length: 2000,
    nullable: true,
  })
  description_ru: string;

  @Column({
    type: "varchar",
    length: 2000,
    nullable: true,
  })
  description_de: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
