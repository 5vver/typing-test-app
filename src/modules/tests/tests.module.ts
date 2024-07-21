import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { DatabaseModule } from '../../database/database.module';
import {
  testsProviders,
  testsWordsProviders,
  wordsProviders,
} from './tests.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...testsProviders,
    ...wordsProviders,
    ...testsWordsProviders,
    TestsService,
  ],
  controllers: [TestsController],
})
export class TestsModule {}
