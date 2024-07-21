import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TestsModule } from './modules/tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, TestsModule, AuthModule],
})
export class AppModule {}
