import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatisticsEntity } from '../../users/entities/user_statistics.entity';
import { TestWordsEntity } from './test_words.entity';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => UserStatisticsEntity, (stats) => stats.test)
  statistic_records: UserStatisticsEntity[];

  @OneToMany(() => TestWordsEntity, (testWords) => testWords.test)
  test_words: TestWordsEntity[];
}
