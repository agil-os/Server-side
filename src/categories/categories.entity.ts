import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { PricesEntity } from "../prices/prices.entity";

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') name: string;

    @OneToMany(type => TripsEntity, trips => trips.lodging)
    trips: TripsEntity[];

    @OneToMany(type => PricesEntity, price => price.category)
    price: PricesEntity[];


}