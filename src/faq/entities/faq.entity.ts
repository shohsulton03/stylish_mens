import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("faq")
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  question_eng: string;

  @Column({ type: "varchar" })
  question_ru: string;

  @Column({ type: "varchar" })
  question_de: string;

  @Column({ type: "text" })
  answer_eng: string;

  @Column({ type: "text" })
  answer_ru: string;

  @Column({ type: "text" })
  answer_de: string;
}
