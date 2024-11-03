import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatisticsEntity } from './user_statistics.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => UserStatisticsEntity, (stats) => stats.user)
  statistics_records: UserStatisticsEntity[];

  @BeforeInsert()
  setNickname() {
    if (!this.nickname) {
      this.nickname = this.username;
    }
  }
}
