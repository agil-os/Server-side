import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('quality')
export class QualityEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column('text') level: string;

}