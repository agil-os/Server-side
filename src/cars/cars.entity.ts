import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { GasEntity } from "../gas/gas.entity";
import { TripsEntity } from "../trips/trips.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) tripDistance: string;

    @Column({nullable: true }) pricePerGal: string;

    @Column({nullable: true }) total: string;

    @ManyToOne(type => TripsEntity, trips => trips.cars, {onDelete: 'CASCADE'})
    trips: TripsEntity;

}