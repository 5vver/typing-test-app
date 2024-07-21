import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestEntity } from '../../tests/entities/test.entity';
import { UserEntity } from './user.entity';

@Entity()
export class UserStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  wpm: number;

  @ManyToOne(() => UserEntity, (user) => user.statistics_records)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.statistic_records)
  @JoinColumn({ name: 'test_id' })
  test: TestEntity;
}
