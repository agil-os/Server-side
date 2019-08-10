import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { CitiesEntity } from "../cities/cities.entity";
import { PricesEntity } from "../prices/prices.entity";
import { QualityEntity } from "../quality/quality.entity";
import { CategoriesEntity } from "../categories/categories.entity";
import { CarsEntity } from "../cars/cars.entity";

@Entity('trips')
export class TripsEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() departureDate: number;

    @Column() arrivalDate: number;

    @ManyToOne(type => UsersEntity, user => user.trips) user: UsersEntity;

    @OneToMany(type => CitiesEntity, city => city.trips) city: CitiesEntity[];

    @OneToMany(type => PricesEntity, price => price.trips) price: PricesEntity[];

    @OneToOne(type => QualityEntity)
    @JoinColumn()
    quality: QualityEntity;

    @OneToOne(type => CategoriesEntity)
    @JoinColumn()
    categories: CategoriesEntity;

    @OneToOne(Type => CarsEntity)
    @JoinColumn()
    cars: CarsEntity;
}