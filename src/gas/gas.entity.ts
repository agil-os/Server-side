import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('gas')
export class GasEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() pricePerGal: string;

    @CreateDateColumn() lastSearched: Date; 

}