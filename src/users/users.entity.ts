import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column('text') username: string;

    @Column() hometown: string;

    @Column('text') email: string;

    @OneToMany(type => TripsEntity, trips => trips.user)
    cascade: true
    trips: TripsEntity[];
}