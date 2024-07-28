import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { UsersService } from '../modules/users/users.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const jwt = await this.authService.login(req.user);
    res.cookie('jwt-access-token', jwt.access_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
    });
    return res.send('Logged in successfully');
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt-access-token');
    return res.send('Logged out successfully');
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    const { username } = registerDto;
    if (await this.usersService.findByUsername(username))
      throw new ForbiddenException('User already exists');
    return await this.usersService.create(registerDto);
  }
}
