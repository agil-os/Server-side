import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cars')
export class CarsEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() isRental: boolean;

    @Column() tripDistance: number;

    
}