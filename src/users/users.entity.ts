import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) username: string;

    @Column({nullable: true}) hometown: number;

    @Column({nullable: true}) email: string;

    @OneToMany(type => TripsEntity, trips => trips.user)
    cascade: true
    trips: TripsEntity[];
}