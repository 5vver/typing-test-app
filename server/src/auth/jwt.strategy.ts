import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload, JwtValidate } from './types';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { type Request } from 'express';
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
        (request: Request) => {
          return request?.cookies?.['jwt-refresh-token'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true,
      ignoreExpiration: true, // so it passes to validate method even if token is expired
    });
  }

  // TODO: Fix that later
  async validate(req: Request, payload: JwtPayload): Promise<JwtValidate> {
    const accessToken = req.cookies?.['jwt-access-token'];
    const verifiedAccessToken = await this.authService.verifyToken(accessToken);
    if (verifiedAccessToken)
      return {
        userId: verifiedAccessToken.sub,
        username: verifiedAccessToken.username,
      };

    /** if access token in invalid we check refresh token */
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
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
      maxAge: 1000 * 60 * 15,
    });

    const newPayload = await this.authService.decodeToken(
      newAccessToken.access_token,
    );
    return { userId: newPayload.sub, username: newPayload.username };
  }
}
