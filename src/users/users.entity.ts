import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn() id: number; 

    @Column('text') username: string;

    @Column() hometown: number;

    @Column('text') email: string;
}