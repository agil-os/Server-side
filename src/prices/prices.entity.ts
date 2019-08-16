import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { QualityEntity } from "../quality/quality.entity";
import { CategoriesEntity } from "../categories/categories.entity";


@Entity('prices')
export class PricesEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column() low: number;

    @Column() average: number;

    @Column() high: number;

    // @CreateDateColumn() lastSearched: Date;

    @Column({nullable: true}) tripsId: number;

    @Column({ nullable: true }) qualityId: number;

    @Column({ nullable: true }) categoryId: number;

    @ManyToOne(type => TripsEntity, trips => trips.price) trips: TripsEntity;

    @OneToOne(type => QualityEntity)
    @JoinColumn()
    quality: QualityEntity;

    @OneToOne(type => CategoriesEntity)
    @JoinColumn()
    category: CategoriesEntity;
}