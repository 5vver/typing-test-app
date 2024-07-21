import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { UserEntity } from '../modules/users/entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.usersService.findByUsername(username);
    const isValid = await bcrypt.compare(pass, user.password);

    if (isValid) {
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getJwtSecretKey() {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }
}
