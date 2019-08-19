import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { GasEntity } from "../gas/gas.entity";
import { TripsEntity } from "../trips/trips.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    @PrimaryGeneratedColumn() id: number; 

    @Column() isRental: boolean;

    @Column({nullable: true}) tripDistance: string;

    @ManyToOne(type => TripsEntity, trips => trips.cars, {onDelete: 'CASCADE'})
    trips: TripsEntity;

    @OneToMany(type => GasEntity, gas => gas.cars)
    gas: GasEntity[];

    
}