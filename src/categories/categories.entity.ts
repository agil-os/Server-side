import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') name: string;

}