import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { QualityEntity } from "../quality/quality.entity";
import { CategoriesEntity } from "../categories/categories.entity";


@Entity('prices')
export class PricesEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() low: string;

    @Column() average: string;

    @Column() high: string;

    @CreateDateColumn() lastSearched: Date;

    @ManyToOne(type => TripsEntity, trips => trips.price) trips: TripsEntity;

    @OneToOne(type => QualityEntity)
    @JoinColumn()
    quality: QualityEntity;

    @OneToOne(type => CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity;
}