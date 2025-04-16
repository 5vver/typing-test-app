import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { SelectWordsOptionsDto } from './dto/select-words-options.dto';
import { ProcessFormDictDto } from './dto/process-form-dict.dto';
import { GenericResponse } from 'src/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types';
import { UsersService } from '../users/users.service';
import { usersRoles } from '../users/constants';
import { GetDictsResponse } from './dto/get-dicts-response.dto';

@Controller('/tests')
export class TestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/getRandomWords')
  async selectRandomWords(@Body() options: SelectWordsOptionsDto) {
    return await this.testsService.getRandomWords(options);
  }

  @Post('/processDict')
  @UseGuards(JwtAuthGuard)
  async processDict(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ProcessFormDictDto,
  ) {
    const user = await this.usersService.findOne(req.user.userId);

    if (user.role !== usersRoles.admin) {
      throw new UnauthorizedException(
        "You don't have permission to perform this action",
      );
    }

    const success = await this.testsService.processFormDict(dto);

    return { success } as GenericResponse;
  }

  @Get('/getDicts')
  async getDicts(@Param('id') id?: string) {
    const dictsResponse = await this.testsService.getDicts(id);

    return {
      data: dictsResponse,
      success: true,
    } as GenericResponse<GetDictsResponse>;
  }

  @Delete('/removeDict')
  @UseGuards(JwtAuthGuard)
  async removeDict(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.findOne(req.user.userId);

    if (user.role !== usersRoles.admin) {
      throw new UnauthorizedException(
        "You don't have permission to perform this action",
      );
    }

    const { affected } = await this.testsService.removeDict(id);

    return {
      success: affected > 0,
      message:
        affected > 0
          ? 'Successfully deleted dictionary'
          : 'Error while deleting dictionary',
    } satisfies GenericResponse;
  }
}
