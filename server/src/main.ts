import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

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

    app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });

    await app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};
bootstrap();
