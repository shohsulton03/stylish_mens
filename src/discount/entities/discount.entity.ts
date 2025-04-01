import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('discount')
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    discount: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}  