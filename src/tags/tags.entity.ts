import { UserEntity } from './../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('tags')
export class TagsEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @Index()
  @Column()
  title: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
