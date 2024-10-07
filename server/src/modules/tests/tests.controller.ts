import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TestsService } from './tests.service';
import { SelectWordsOptionsDto } from './dto/select-words-options.dto';
import { ProcessFormDictDto } from './dto/process-form-dict.dto';

@Controller('/tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/getRandomWords')
  async selectRandomWords(@Body() options: SelectWordsOptionsDto) {
    return await this.testsService.getRandomWords(options);
  }

  @Post('/processDict')
  async processDict(@Body() dto: ProcessFormDictDto) {
    const success = await this.testsService.processFormDict(dto);

    return { success };
  }

  @Get('/getDicts')
  async getDicts() {
    return await this.testsService.getDicts();
  }

  @Delete('/removeDict')
  async removeDict(@Body() { id }: { id: string }) {
    return await this.testsService.removeDict(id);
  }
}
