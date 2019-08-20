import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { QualityEntity } from "../quality/quality.entity";
import { CategoriesEntity } from "../categories/categories.entity";


@Entity('prices')
export class PricesEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) low: string;

    @Column({nullable: true }) average: string;

    @Column({nullable: true }) high: string;

    @Column({nullable: true }) subTotal: string;

    @ManyToOne(type => TripsEntity, trips => trips.price, {onDelete: 'CASCADE'}) 
    trips: TripsEntity;

    @ManyToOne(type => QualityEntity, quality => quality.price)
    quality: QualityEntity;

    @ManyToOne(type => CategoriesEntity, category => category.price)
    category: CategoriesEntity;


}