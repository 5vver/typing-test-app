import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserStatisticsEntity } from './entities/user_statistics.entity';
import { usersRepositoriesConstants } from './constants';
import { dataSourceRepository } from '../../database/constants';
import { UserPicturesEntity } from './entities/user_pictures.entity';

const usersProviders = [
  {
    provide: usersRepositoriesConstants.users,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [dataSourceRepository],
  },
];

const usersStatisticsProviders = [
  {
    provide: usersRepositoriesConstants.usersStatistics,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserStatisticsEntity),
    inject: [dataSourceRepository],
  },
];

const usersPicturesProviders = [
  {
    provide: usersRepositoriesConstants.usersPictures,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserPicturesEntity),
    inject: [dataSourceRepository],
  },
];

export { usersProviders, usersStatisticsProviders, usersPicturesProviders };
