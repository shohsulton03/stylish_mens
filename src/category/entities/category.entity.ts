import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'name'})
    name: string;

    @Column({ type: 'varchar', name: 'description'})
    description: string;
}
