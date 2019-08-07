import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cities')
export class CitiesEntity {
    @PrimaryGeneratedColumn('uuid') code: string; 

    @Column('text') name: string;

    @Column() lat: number;

    @Column() lon: number;

    @Column('text') imgURL: string;
}