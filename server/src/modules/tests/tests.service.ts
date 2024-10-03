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
    const { count, lang = 'ru' } = options;

    const wordsLength = await this.wordsRepository.count();
    const amount = count > wordsLength ? wordsLength : count;

    return this.wordsRepository
      .createQueryBuilder('words')
      .where('words.lang = :lang', { lang })
      .orderBy('RANDOM()')
      .limit(amount)
      .getMany();
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
      }

      dict.title = title;
      await queryRunner.manager.save(dict);

      for (const word of words) {
        let wordEntity = await queryRunner.manager.findOne(WordsEntity, {
          where: { word },
        });

        if (!wordEntity) {
          wordEntity = new WordsEntity();
          wordEntity.word = word;
          wordEntity.lang = lang;
          await queryRunner.manager.save(wordEntity);
        }

        // maybe check if testWord already exists
        const testWord = new TestWordsEntity();
        testWord.test = dict;
        testWord.word = wordEntity;
        await queryRunner.manager.save(testWord);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
