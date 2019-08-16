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

    @Column() name: string;

    @Column() departureDate: string;

    @Column() arrivalDate: string;

    @Column() origin: string;

    @Column() destination: string;

    @Column({nullable: true}) userId: number;

    // @Column({nullable: true}) destinationId: number;

    // @Column({nullable: true}) originId: number;

    @Column({ nullable: true }) qualityId: number;

    @Column({ nullable: true }) lodgingId: number;

    @Column({ nullable: true }) transportationId: number;

    @ManyToOne(type => UsersEntity, user => user.trips) 
    user: UsersEntity;

    // @OneToMany(type => CitiesEntity, city => city.trips) city: CitiesEntity[];

    // @OneToOne(type => CitiesEntity)
    // @JoinColumn()
    // destination: CitiesEntity;

    // @OneToOne(type => CitiesEntity)
    // @JoinColumn()
    // origin: CitiesEntity;

    @OneToMany(type => PricesEntity, price => price.trips) price: PricesEntity[];

    @OneToOne(type => QualityEntity)
    @JoinColumn()
    quality: QualityEntity;

    @OneToOne(type => CategoriesEntity)
    @JoinColumn()
    lodging: CategoriesEntity;

    @OneToOne(type => CategoriesEntity)
    @JoinColumn()
    transportation: CategoriesEntity;

}