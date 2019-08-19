import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { CitiesEntity } from "../cities/cities.entity";
import { PricesEntity } from "../prices/prices.entity";
import { QualityEntity } from "../quality/quality.entity";
import { CategoriesEntity } from "../categories/categories.entity";
import { CarsEntity } from "../cars/cars.entity";

@Entity('trips')
export class TripsEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() name: string;

    @Column({ nullable: true }) departureDate: Date;

    @Column({ nullable: true }) arrivalDate: Date;

    @Column({nullable: true}) origin: string;

    @Column({nullable: true}) destination: string;

    @Column({ nullable: true }) pic: string;

    @Column({ nullable: true }) isRental: boolean;

    @Column("decimal", { precision: 7, scale: 2, nullable: true }) total: number;

    @ManyToOne(type => UsersEntity, user => user.trips, {onDelete: 'CASCADE'})
    user: UsersEntity;

    @OneToMany(type => PricesEntity, price => price.trips) 
    price: PricesEntity[];

    @ManyToOne(type => QualityEntity, quality => quality.trips)
    quality: QualityEntity;

    @ManyToOne(type => CategoriesEntity, lodging => lodging.trips)
    lodging: CategoriesEntity;

    @ManyToOne(type => CategoriesEntity, transportation => transportation.trips)
    transportation: CategoriesEntity;

    @OneToMany(type => CarsEntity, cars => cars.trips)
    cars: CarsEntity[];

}