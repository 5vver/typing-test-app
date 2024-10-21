import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserStatisticsEntity } from './entities/user_statistics.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { saltRounds, usersRepositoriesConstants } from './constants';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(usersRepositoriesConstants.users)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(usersRepositoriesConstants.usersStatistics)
    private readonly usersStatisticsRepository: Repository<UserStatisticsEntity>,
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
  ): Promise<{ success: boolean; message?: string }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      return {
        success: false,
        message: 'User not found.',
      };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        success: false,
        message: 'Password is incorrect.',
      };
    }

    user.password = await bcrypt.hash(newPassword, saltRounds);
    await this.usersRepository.save(user);

    return { success: true, message: 'Password changed successfully.' };
  }
}
