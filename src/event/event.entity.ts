import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() price: string;

  @Column() picture: string;

  @Column() link: string;
}
