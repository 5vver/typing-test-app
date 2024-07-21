import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserStatisticsEntity } from './entities/user_statistics.entity';
import { usersRepositoriesConstants } from './constants';
import { dataSourceRepository } from '../../database/constants';

export const usersProviders = [
  {
    provide: usersRepositoriesConstants.users,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [dataSourceRepository],
  },
];

export const usersStatisticsProviders = [
  {
    provide: usersRepositoriesConstants.usersStatistics,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserStatisticsEntity),
    inject: [dataSourceRepository],
  },
];
