import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('quality')
export class QualityEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') level: string;

}