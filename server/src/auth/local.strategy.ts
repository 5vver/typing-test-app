import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    this.logger.log(`Validating user: ${username}`);
    try {
      const user = await this.authService.validateUser(username, password);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}
