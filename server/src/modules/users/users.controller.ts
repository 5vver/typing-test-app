import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../auth/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserStatisticsDto } from './dto/create-user-statistics.dto';
import { GetUserStatisticsDto } from './dto/get-user-statistics.dto';
import { GenericResponse } from 'src/types';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // TODO: Remove this endpoint
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    const { userId } = req.user;
    const { id, username, email, role, nickname } =
      await this.usersService.findOne(userId);

    const picture = await this.usersService.getProfilePicture(id);

    return { id, username, email, role, nickname, avatar: picture?.url };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/password/update')
  async updatePassword(
    @Request() req: AuthenticatedRequest,
    @Body()
    { password, newPassword }: { password: string; newPassword: string },
  ) {
    const { userId } = req.user;

    if (!password || !newPassword) {
      return {
        success: false,
        message: 'Password is not provided.',
      };
    }

    return await this.usersService.updatePassword(
      userId,
      password,
      newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/nickname/update')
  async updateNickname(
    @Request() req: AuthenticatedRequest,
    @Body() { nickname }: { nickname: string },
  ) {
    const { userId } = req.user;

    if (!nickname) {
      throw new BadRequestException('Nickname is not provided.');
    }

    return await this.usersService.updateNickname(userId, nickname);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/avatar/upload')
  async uploadProfilePicture(
    @Request() req: AuthenticatedRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.usersService.setProfilePicture(
        req.user.userId,
        file.filename,
      );
    } catch (error) {
      return {
        success: false,
        message: error.message as string,
      } as GenericResponse;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/result/save')
  async saveTestResult(
    @Request() req: AuthenticatedRequest,
    @Body() createUserStatistics: CreateUserStatisticsDto,
  ) {
    const res = await this.usersService.saveResults(
      req.user.userId,
      createUserStatistics,
    );
    const isInserted = res.identifiers.length > 0;

    return {
      success: isInserted,
      message: 'Test results saved successfully',
    } as GenericResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/result/get')
  async getTestResults(
    @Request() req: AuthenticatedRequest,
    @Body() payload: GetUserStatisticsDto,
  ) {
    const res = await this.usersService.getUserResults(
      req.user.userId,
      payload,
    );

    return { success: !!res, data: res } as GenericResponse;
  }
}
