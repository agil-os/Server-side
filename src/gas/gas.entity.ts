import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { CarsEntity } from "../cars/cars.entity";

@Entity('gas')
export class GasEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column("decimal", { precision: 5, scale: 2 }) pricePerGal: number;

    @ManyToOne(type => CarsEntity, cars => cars.gas, {onDelete: 'CASCADE'})
    cars: CarsEntity;
}