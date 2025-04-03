import { OrderProduct } from "src/common/types/order-product.type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    //  product json formatda keladi !
    @Column({ type: 'jsonb'})
    product_ts: OrderProduct[];

    @Column({ type: 'varchar'})
    full_name: string;

    @Column({ type: 'varchar'})
    phone_number: string;

    @Column({ type: 'varchar'})
    email: string;

    @Column({ type: 'varchar'})
    country: string;

    @Column({ type: 'varchar'})
    city: string;

    @Column({ type: 'varchar'})
    whatsapp_number: string;

}
