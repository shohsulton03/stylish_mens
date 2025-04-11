import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  phone_number: string;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  address_en: string;

  @Column({ type: "varchar", nullable: true })
  address_ru: string;

  @Column({ type: "varchar", nullable: true })
  address_de: string;
}
