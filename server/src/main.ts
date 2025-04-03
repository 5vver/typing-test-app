import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { isDev } from './constants';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    const HOST = configService.get<string>('HOST') || 'localhost';
    const PORT = configService.get<number>('PORT') || 5000;
    const CLIENT_URLS = configService.get<string>('CLIENT_URLS').split(',');

    app.enableCors({
      credentials: true,
      origin: (reqOrigin, callback) => {
        if (!reqOrigin || CLIENT_URLS.includes(reqOrigin)) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      },
    });
    app.use(cookieParser());

    app.useStaticAssets(join(__dirname, '..', 'public', 'images'), {
      prefix: '/public/images',
    });

    // Validate requests body data
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: isDev,
      }),
    );

    await app.listen(PORT, HOST, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
