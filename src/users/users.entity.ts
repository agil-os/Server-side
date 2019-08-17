import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, JoinColumn } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) username: string;

    @Column({nullable: true}) hometown: string;

    @Column({nullable: true}) email: string;

    @OneToMany(type => TripsEntity, trips => trips.user)
    @JoinColumn({name: "id"})
    trips: TripsEntity[];
}