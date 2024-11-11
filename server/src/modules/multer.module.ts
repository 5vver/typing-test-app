import { BadRequestException, Module } from '@nestjs/common';

import { MulterModule as NestMulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { JwtValidate } from '../auth/types';

@Module({
  imports: [
    NestMulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '..', '..', 'public', 'images'));
        },
        filename(req, file, callback) {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const userId = (req.user as JwtValidate).userId;
          const ext = extname(file.originalname);

          callback(null, `${userId}-${uniqueSuffix}-profile${ext}`);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.mimetype.match('image/')) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 25,
      },
    }),
  ],
  exports: [NestMulterModule],
})
export class MulterModule {}
