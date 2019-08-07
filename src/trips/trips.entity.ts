import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('trips')
export class PricesEntity {
    @PrimaryGeneratedColumn('uuid') code: string; 

    @Column('text') name: string;

    @Column() lat: number;

    @Column() lon: number;

    @Column('text') imgURL: string;
}