import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";

@Entity('users')
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column({nullable: true}) username: string;

<<<<<<< HEAD
    @Column({nullable: true}) hometown: number;
=======
    @Column() hometown: string;
>>>>>>> 0fea368f52e886b9778afcf52f3d4c6b1c0aa483

    @Column({nullable: true}) email: string;

    @OneToMany(type => TripsEntity, trips => trips.user)
    cascade: true
    trips: TripsEntity[];
}