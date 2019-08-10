import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column('text') username: string;

    @Column() hometown: number;

    @Column('text') email: string;

    @OneToMany(type => TripsEntity, trips => trips.user) trips: TripsEntity[];
}