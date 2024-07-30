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
    if (!user) return null;

    const isValid = await bcrypt.compare(pass, user.password);
    if (isValid) {
      //eslint-disable-next-line @typescript-eslint/no-unused-vars -- take out password from user object
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
      'jwt-access-token': this.jwtService.sign(payload, {
        expiresIn: '15 minutes',
      }),
      'jwt-refresh-token': this.jwtService.sign(payload, {
        expiresIn: '30 days',
      }),
    };
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error) {
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const verifiedRefreshToken = await this.verifyToken(refreshToken);
    if (!verifiedRefreshToken) return null;

    const { sub } = verifiedRefreshToken;
    const user = await this.usersService.findOne(sub);
    if (!user) return null;

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '15 minutes',
      }),
    };
  }

  async decodeToken(token: string) {
    return this.jwtService.decode<JwtPayload>(token);
  }
}
