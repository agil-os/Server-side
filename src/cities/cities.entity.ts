import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cities')
export class CitiesEntity {
    @PrimaryGeneratedColumn() id: string; 

    @Column('text') idea: string;

    @Column('text') desciption: string;
}