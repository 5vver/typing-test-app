import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload, JwtValidate } from './types';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['jwt-access-token'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true,
      ignoreExpiration: true, // so it passes to validate method even if token is expired
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtValidate> {
    try {
      return { userId: payload.sub, username: payload.username };
    } catch (error) {
      const refreshToken = req.cookies?.['jwt-refresh-token'];
      if (!refreshToken)
        throw new UnauthorizedException('Refresh token not found');

      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      if (!newAccessToken)
        throw new UnauthorizedException('Invalid refresh token');

      req.res?.cookie('jwt-access-token', newAccessToken.access_token, {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') !== 'development',
        sameSite: 'strict',
      });

      const newPayload = await this.authService.decodeToken(
        newAccessToken.access_token,
      );
      return { userId: newPayload.sub, username: newPayload.username };
    }
  }
}
