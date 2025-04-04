import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("discount")
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  discount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ type: "date" })
  started_at: string;

  @Column({ type: "date" })
  finished_at: string;

  @Column({ type: "boolean", default:false })
  status: boolean;

  @OneToMany(() => Product, (product) => product.discount)
  products: Product[];
}  