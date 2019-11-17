import { StageEntity } from './../stage/stage.entity';
import { LabelEntity } from './../label/label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('deals')
export class DealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  linkedinId: string;

  @Column('jsonb')
  custom: any;

  @ManyToOne(() => LabelEntity)
  label: LabelEntity;

  @ManyToOne(() => StageEntity, { nullable: true })
  stage?: StageEntity;

  @CreateDateColumn()
  created: Date;
}
