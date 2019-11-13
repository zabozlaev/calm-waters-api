import { UserEntity } from './../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('labels')
export class LabelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn()
  created: Date;
}
