import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestEntity } from './test.entity';
import { WordsEntity } from './words.entity';

@Entity()
export class TestWordsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TestEntity, (test) => test.test_words)
  @JoinColumn({ name: 'test_id' }) // this adds a test_id column to the TestWordsEntity table
  test: TestEntity;

  @ManyToOne(() => WordsEntity, (word) => word.test_words)
  @JoinColumn({ name: 'word_id' }) // this adds a word_id column to the TestWordsEntity table
  word: WordsEntity;
}
