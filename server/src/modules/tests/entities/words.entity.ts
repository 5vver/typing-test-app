import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestWordsEntity } from './test_words.entity';

@Entity()
export class WordsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @OneToMany(() => TestWordsEntity, (testWords) => testWords.word)
  test_words: TestWordsEntity[];
}
