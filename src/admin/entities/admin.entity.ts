import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  login: string;

  @Column({ type: "varchar" })
  hashed_password: string;

  @Column({ type: "varchar", nullable: true })
  hashed_refresh_token: string;

  @Column({ type: "boolean", default: false })
  is_creator: boolean;

  @Column({ type: "boolean", default: false })
  is_active: boolean;
}
