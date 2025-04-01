import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('team_section')
export class TeamSection {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: "varchar"})
    image:string

    @Column({type: "varchar"})
    full_name:string

    @Column({type: "varchar"})
    position:string
}
