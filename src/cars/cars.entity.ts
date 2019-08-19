import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { GasEntity } from "../gas/gas.entity";
import { TripsEntity } from "../trips/trips.entity";

@Entity('cars')
export class CarsEntity extends BaseEntity{
    @PrimaryGeneratedColumn() id: number; 

    @Column() isRental: boolean;

    @Column({nullable: true}) tripDistance: string;

    @Column("decimal", { precision: 5, scale: 2, nullable: true }) pricePerGal: number;

    @Column("decimal", { precision: 6, scale: 2, nullable: true }) total: number;

    @ManyToOne(type => TripsEntity, trips => trips.cars, {onDelete: 'CASCADE'})
    trips: TripsEntity;

    // @OneToMany(type => GasEntity, gas => gas.cars)
    // gas: GasEntity[];

    
}