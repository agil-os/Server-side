import { Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
}