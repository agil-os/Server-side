import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { TripsEntity } from "../trips/trips.entity";
import { UsersEntity } from "../users/users.entity";

@Entity('cities')
export class CitiesEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column() code: number;

    @Column('text') name: string;

    @Column() lat: number;

    @Column() lon: number;

    @Column('text') imgURL: string;
<<<<<<< HEAD
}

=======

    @ManyToOne(type => TripsEntity, trips => trips.city) trips: TripsEntity;

    @OneToOne(type => UsersEntity) 
    @JoinColumn()
    user: UsersEntity; 
}
>>>>>>> 4d9b0771f1dbdaee2cda2083f0cc145a4f365f38
