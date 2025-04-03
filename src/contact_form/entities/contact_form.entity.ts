import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ContactForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    phone_number: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    comments: string;

}
