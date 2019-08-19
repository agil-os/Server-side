import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { UsersEntity } from "../users/users.entity";

@Entity('cities')
export class CitiesEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() code: number;

    @Column('text') name: string;

    @Column('text') lat: string;

    @Column('text') lon: string;

    @Column('text') imgURL: string;

}
