import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('prices')
export class CitiesEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column('text') name: string;

    @Column() lat: number;

    @Column() lon: number;

    @Column('text') imgURL: string;
}