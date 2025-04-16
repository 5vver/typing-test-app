import { forwardRef, Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { DatabaseModule } from '../../database/database.module';
import {
  testsProviders,
  testsWordsProviders,
  wordsProviders,
} from './tests.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsersModule)],
  providers: [
    ...testsProviders,
    ...wordsProviders,
    ...testsWordsProviders,
    TestsService,
  ],
  controllers: [TestsController],
  exports: [TestsService],
})
export class TestsModule {}
