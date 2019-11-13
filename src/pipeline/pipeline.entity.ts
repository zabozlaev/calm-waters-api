import { StageEntity } from './../stage/stage.entity';
import { UserEntity } from './../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('pipelines')
export class PipelineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @CreateDateColumn()
  created: Date;

  @OneToMany(() => StageEntity, stage => stage.pipeline)
  stages: StageEntity[];

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
