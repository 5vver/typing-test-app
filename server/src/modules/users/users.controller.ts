import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../auth/types';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    const { userId } = req.user;
    const { id, username, email, role } =
      await this.usersService.findOne(userId);

    return { id, username, email, role };
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
}
