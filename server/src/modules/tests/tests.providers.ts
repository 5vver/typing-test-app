import { DataSource } from 'typeorm';
import { TestEntity } from './entities/test.entity';
import { TestWordsEntity } from './entities/test_words.entity';
import { WordsEntity } from './entities/words.entity';
import { dataSourceRepository } from '../../database/constants';
import { testsRepositoriesConstants } from './constants';

export const testsProviders = [
  {
    provide: testsRepositoriesConstants.tests,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TestEntity),
    inject: [dataSourceRepository],
  },
];

export const wordsProviders = [
  {
    provide: testsRepositoriesConstants.words,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WordsEntity),
    inject: [dataSourceRepository],
  },
];

export const testsWordsProviders = [
  {
    provide: testsRepositoriesConstants.testsWords,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TestWordsEntity),
    inject: [dataSourceRepository],
  },
];
