import { Inject, Injectable } from '@nestjs/common';
import { TestEntity } from './entities/test.entity';
import { DataSource, Repository } from 'typeorm';
import { WordsEntity } from './entities/words.entity';
import { CreateWordsDto } from './dto/create-words.dto';
import { TestWordsEntity } from './entities/test_words.entity';
import { SelectWordsOptionsDto } from './dto/select-words-options.dto';
import { dataSourceRepository } from '../../database/constants';
import { ProcessFormDictDto } from './dto/process-form-dict.dto';

@Injectable()
export class TestsService {
  constructor(
    @Inject('TESTS_REPOSITORY')
    private testsRepository: Repository<TestEntity>,
    @Inject('WORDS_REPOSITORY')
    private wordsRepository: Repository<WordsEntity>,
    @Inject('TESTS_WORDS_REPOSITORY')
    private testsWordsRepository: Repository<TestWordsEntity>,
    @Inject(dataSourceRepository)
    private dataSource: DataSource,
  ) {}

  async createWord(dto: CreateWordsDto) {
    const word = new WordsEntity();
    word.word = dto.word;
    return this.wordsRepository.save(word);
  }

  async getRandomWords(options: SelectWordsOptionsDto) {
    const { dictId, lang = 'ru' } = options;

    const testWords = await this.testsWordsRepository
      .createQueryBuilder('testWords')
      .innerJoinAndSelect('testWords.word', 'word')
      .where('testWords.test_id = :dictId', { dictId })
      // .andWhere('word.lang = :lang', { lang })
      .getMany();

    return testWords.map(({ word }) => word);
  }

  getDicts() {
    return this.testsRepository.find();
  }

  async removeDict(id: string) {
    await this.testsWordsRepository.delete({ test: { id } });

    return await this.testsRepository.delete({ id });
  }

  async processFormDict({ title, words, lang }: ProcessFormDictDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let dict = await queryRunner.manager.findOne(TestEntity, {
        where: { title },
      });

      if (!dict) {
        dict = new TestEntity();
        dict.title = title;
        await queryRunner.manager.save(dict);
      }

      for (const word of words) {
        let wordEntity = await queryRunner.manager.findOne(WordsEntity, {
          where: { word },
        });

        if (!wordEntity) {
          wordEntity = new WordsEntity();
          wordEntity.word = word;
          // wordEntity.lang = lang;
          await queryRunner.manager.save(wordEntity);
        }

        let testWord = await queryRunner.manager.findOne(TestWordsEntity, {
          where: { test: dict, word: wordEntity },
        });

        if (testWord) {
          continue;
        }

        testWord = new TestWordsEntity();
        testWord.test = dict;
        testWord.word = wordEntity;
        await queryRunner.manager.save(testWord);
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
