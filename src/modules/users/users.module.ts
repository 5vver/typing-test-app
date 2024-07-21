import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { usersProviders, usersStatisticsProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, ...usersStatisticsProviders, UsersService],
  controllers: [UsersController],
  exports: [
    DatabaseModule,
    ...usersProviders,
    ...usersStatisticsProviders,
    UsersService,
  ],
})
export class UsersModule {}
