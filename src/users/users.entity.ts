import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, JoinColumn } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) username: string;

    @Column({type: 'text' ,nullable: true}) hometown: string;

    @Column({nullable: true}) email: string;

    @Column({ nullable: true }) pic: string;

    @OneToMany(type => TripsEntity, trips => trips.user, {cascade: true})
    trips: TripsEntity[];
}