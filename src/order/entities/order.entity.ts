import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    cartId: number;

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
