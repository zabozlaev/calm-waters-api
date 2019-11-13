import { LabelEntity } from './../label/label.entity';
import { PipelineEntity } from './../pipeline/pipeline.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatar: string;

  @Index()
  @Column()
  linkedInId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PipelineEntity, pipeline => pipeline.user)
  pipelines: PipelineEntity[];

  @OneToMany(() => LabelEntity, label => label.user)
  labels: LabelEntity[];
}
