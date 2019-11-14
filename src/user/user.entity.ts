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
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @Column()
  displayName: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  avatar: string;

  @ApiModelProperty()
  @Index()
  @Column()
  linkedInId: string;

  @ApiModelProperty()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PipelineEntity, pipeline => pipeline.user)
  pipelines: PipelineEntity[];

  @OneToMany(() => LabelEntity, label => label.user)
  labels: LabelEntity[];
}
