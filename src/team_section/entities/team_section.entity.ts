import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("team_section")
export class TeamSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable:true })
  image: string;

  @Column({ type: "varchar" })
  full_name: string;

  @Column({ type: "varchar" })
  position_de: string; // O‘zbekcha

  @Column({ type: "varchar" })
  position_ru: string; // Ruscha

  @Column({ type: "varchar" })
  position_eng: string; // Inglizcha
}
