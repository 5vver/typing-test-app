import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import {
  usersPicturesProviders,
  usersProviders,
  usersStatisticsProviders,
} from './users.providers';
import { MulterModule } from '../multer.module';

@Module({
  imports: [DatabaseModule, MulterModule],
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
