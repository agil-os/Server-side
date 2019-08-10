import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('prices')
export class PricesEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() low: number;

    @Column() average: number;

    @Column() high: number;

    @CreateDateColumn() lastSearched: Date;

    @ManyToOne(type => TripsEntity, trips => trips.price) trips: TripsEntity;
}