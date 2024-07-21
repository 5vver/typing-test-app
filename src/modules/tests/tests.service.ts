import { Inject, Injectable } from '@nestjs/common';
import { TestEntity } from './entities/test.entity';
import { Repository } from 'typeorm';
import { WordsEntity } from './entities/words.entity';
import { CreateWordsDto } from './dto/create-words.dto';
import { TestWordsEntity } from './entities/test_words.entity';

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
}
