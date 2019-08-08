import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('gas')
export class GasEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() pricePerGal: number;

    @Column() lastSearched: Date;


}