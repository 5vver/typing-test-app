import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import {
  usersPicturesProviders,
  usersProviders,
  usersStatisticsProviders,
} from './users.providers';
import { MulterModule } from '../multer.module';
import { TestsModule } from '../tests/tests.module';

@Module({
  imports: [DatabaseModule, MulterModule, forwardRef(() => TestsModule)],
  providers: [
    ...usersProviders,
    ...usersStatisticsProviders,
    ...usersPicturesProviders,
    UsersService,
  ],
  controllers: [UsersController],
  exports: [
    DatabaseModule,
    ...usersProviders,
    ...usersStatisticsProviders,
    ...usersPicturesProviders,
    UsersService,
  ],
})
export class UsersModule {}
