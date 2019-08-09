import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('prices')
export class PricesEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() low: number;

    @Column() average: number;

    @Column() high: number;

    @CreateDateColumn() lastSearched: Date;
}