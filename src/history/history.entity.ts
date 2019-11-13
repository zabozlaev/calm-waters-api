import { DealEntity } from './../deal/deal.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity('history')
export class HistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  changed: string;

  @ManyToOne(() => DealEntity)
  deal: DealEntity;

  @CreateDateColumn()
  created: Date;
}
