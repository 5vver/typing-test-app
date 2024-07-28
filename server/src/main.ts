import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const PORT = configService.get<number>('PORT') || 5000;
    const CLIENT_URL = configService.get<string>('CLIENT_URL');

    app.enableCors({ credentials: true, origin: CLIENT_URL });
    app.use(cookieParser());

    await app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

bootstrap();
