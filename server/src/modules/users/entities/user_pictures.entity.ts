import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserPicturesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  timestamp: string;

  @ManyToOne(() => UserEntity, (user) => user.statistics_records)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
