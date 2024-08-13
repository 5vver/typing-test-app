import { Inject, Injectable } from '@nestjs/common';
import { TestEntity } from './entities/test.entity';
import { Repository } from 'typeorm';
import { WordsEntity } from './entities/words.entity';
import { CreateWordsDto } from './dto/create-words.dto';
import { TestWordsEntity } from './entities/test_words.entity';
import { SelectWordsOptionsDto } from './dto/select-words-options.dto';

@Injectable()
export class TestsService {
  constructor(
    @Inject('TESTS_REPOSITORY')
    private testsRepository: Repository<TestEntity>,
    @Inject('WORDS_REPOSITORY')
    private wordsRepository: Repository<WordsEntity>,
    @Inject('TESTS_WORDS_REPOSITORY')
    private testsWordsRepository: Repository<TestWordsEntity>,
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
}
