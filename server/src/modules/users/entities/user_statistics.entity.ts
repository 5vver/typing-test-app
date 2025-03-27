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

  @Column({ default: 0, type: 'float' })
  accuracy: number;

  @Column({ default: 0 })
  correct_words: number;

  @Column({ default: 0 })
  incorrect_words: number;

  @Column({ default: 0 })
  total_words: number;

  @Column({ default: 0 })
  correct_characters: number;

  @Column({ default: 0 })
  missed_characters: number;

  @Column({ default: 0 })
  total_characters: number;

  @Column()
  timestamp: string;

  @ManyToOne(() => UserEntity, (user) => user.statistics_records)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.statistic_records)
  @JoinColumn({ name: 'test_id' })
  test: TestEntity;
}
