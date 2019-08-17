import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { GasEntity } from "../gas/gas.entity";
import { TripsEntity } from "../trips/trips.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    @PrimaryGeneratedColumn() id: number; 

    @Column() isRental: boolean;

    @Column() tripDistance: number;

    // @Column({nullable: true}) gasId: number;

    // @Column({nullable: true}) tripsId: number;


    @ManyToOne(type => TripsEntity, trips => trips.cars)
    trips: TripsEntity;

    @OneToMany(type => GasEntity, gas => gas.cars)
    gas: GasEntity[];

    
}