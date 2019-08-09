import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('categories')
export class CategoriesEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') name: string;

}