import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('trips')
export class TripsEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() departureDate: number;

    @Column() arrivalDate: number;
}