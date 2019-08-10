import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { GasEntity } from "../gas/gas.entity";

@Entity('cars')
export class CarsEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() isRental: boolean;

    @Column() tripDistance: number;

    @OneToOne(type => GasEntity) 
    @JoinColumn()
    gas: GasEntity;

    
}