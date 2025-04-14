import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserStatisticsEntity } from './entities/user_statistics.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { saltRounds, usersRepositoriesConstants } from './constants';

import * as bcrypt from 'bcrypt';
import { UserPicturesEntity } from './entities/user_pictures.entity';
import { join } from 'path';
import { promises as fs } from 'fs';
import { CreateUserStatisticsDto } from './dto/create-user-statistics.dto';
import { testsRepositoriesConstants } from '../tests/constants';
import { TestEntity } from '../tests/entities/test.entity';
import { GetUserStatisticsDto } from './dto/get-user-statistics.dto';
import { GetUserStatisticsDataDto } from './dto/get-user-statistics-data.dto';
import { GenericResponse } from 'src/types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersRepositoriesConstants.users)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(usersRepositoriesConstants.usersStatistics)
    private readonly usersStatisticsRepository: Repository<UserStatisticsEntity>,
    @Inject(usersRepositoriesConstants.usersPictures)
    private readonly usersPicturesRepository: Repository<UserPicturesEntity>,
    @Inject(testsRepositoriesConstants.tests)
    private readonly testsRepository: Repository<TestEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<string> {
    const { username, password, email, role } = dto;

    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = await bcrypt.hash(password, saltRounds);
    if (dto.role) user.role = role;

    const createdUser = await this.usersRepository.save(user);
    if (!createdUser) throw new Error('Failed to create user.');
    return 'User created successfully';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updatePassword(
    userId: string,
    password: string,
    newPassword: string,
  ): Promise<GenericResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      return {
        success: false,
        message: 'User is not found.',
      } as GenericResponse;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        success: false,
        message: 'Password is incorrect.',
      } as GenericResponse;
    }

    user.password = await bcrypt.hash(newPassword, saltRounds);
    await this.usersRepository.save(user);

    return {
      success: true,
      message: 'Password changed successfully.',
    } as GenericResponse;
  }

  async updateNickname(
    userId: string,
    nickname: string,
  ): Promise<GenericResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      return {
        success: false,
        message: 'User is not found.',
      };
    }

    user.nickname = nickname;
    await this.usersRepository.save(user);

    return {
      success: true,
      message: 'Nickname changed successfully.',
    } as GenericResponse;
  }

  async setProfilePicture(userId: string, picUrl: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    try {
      const userPicture = await this.usersPicturesRepository.findOne({
        where: { user },
      });

      if (userPicture) {
        const oldPicturePath = join(
          __dirname,
          '..',
          '..',
          '..',
          'public',
          'images',
          userPicture.url,
        );
        await fs.unlink(oldPicturePath).catch((err) => {
          console.error(err);
        });

        userPicture.url = picUrl;
        userPicture.timestamp = new Date().toISOString();

        await this.usersPicturesRepository.save(userPicture);

        return {
          success: true,
          message: 'Profile picture updated successfully',
        } as GenericResponse;
      }

      await this.usersPicturesRepository.insert({
        user,
        url: picUrl,
        timestamp: new Date().toISOString(),
      });

      return {
        success: true,
        message: 'Profile picture updated successfully',
      } as GenericResponse;
    } catch {
      return {
        success: false,
        message: 'Failed to update profile picture',
      } as GenericResponse;
    }
  }

  async getProfilePicture(userId: string) {
    return await this.usersPicturesRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async saveResults(userId: string, stats: CreateUserStatisticsDto) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const test = await this.testsRepository.findOne({
      where: { id: stats.testId },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    if (!test) {
      throw new NotFoundException('Test is not found');
    }

    return await this.usersStatisticsRepository.insert({
      ...stats,
      user,
      test,
      timestamp: new Date().toISOString(),
    });
  }

  async getUserResults(userId: string, payload: GetUserStatisticsDto) {
    const { pageIndex, pageSize, filter } = payload;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const [statistics, total] =
      await this.usersStatisticsRepository.findAndCount({
        where: { user },
        ...(filter?.order ? { order: { id: filter.order } } : {}),
        skip: pageIndex * pageSize,
        take: pageSize,
        relations: { test: true },
      });

    const processedStats = statistics.map(
      (stat) =>
        ({
          id: stat.id,
          name: stat.test.title,
          wpm: stat.wpm,
          wpmRaw: stat.wpm_raw,
          correctWords: stat.correct_words,
          incorrectWords: stat.incorrect_words,
          totalWords: stat.total_words,
          correctChars: stat.correct_characters,
          incorrectChars: stat.missed_characters,
          totalChars: stat.total_characters,
          accuracy: stat.accuracy,
          timestamp: stat.timestamp,
        }) as GetUserStatisticsDataDto['stats'][0],
    );

    return { stats: processedStats, total } as GetUserStatisticsDataDto;
  }
}
