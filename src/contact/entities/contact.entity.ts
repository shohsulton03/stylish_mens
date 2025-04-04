import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  phone_number: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  address_eng: string;

  @Column({ type: "varchar" })
  address_ru: string;

  @Column({ type: "varchar" })
  address_de: string;
}
