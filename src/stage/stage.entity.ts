import { PipelineEntity } from './../pipeline/pipeline.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';

@Entity('stages')
export class StageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @ManyToOne(() => PipelineEntity)
  pipeline: PipelineEntity;
}
