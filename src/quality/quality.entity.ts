import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { PricesEntity } from "../prices/prices.entity";

@Entity('quality')
export class QualityEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') level: string;

    @OneToMany(type => TripsEntity, trips => trips.quality)
    trips: TripsEntity[];

    @OneToMany(type => PricesEntity, price => price.quality)
    price: PricesEntity[];


}