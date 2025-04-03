import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";


@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'name'})
    name: string;

    @Column({ type: 'varchar', name: 'description', length:2000})
    description: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
