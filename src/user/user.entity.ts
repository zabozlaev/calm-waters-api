import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
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
}
