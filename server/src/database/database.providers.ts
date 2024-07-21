import { DataSource } from 'typeorm';
import { dataSourceRepository } from './constants';

export const databaseProviders = [
  {
    provide: dataSourceRepository,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'TypingTestDB',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // change to false in production
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
