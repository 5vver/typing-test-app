import { Body, Controller, Get, Post } from '@nestjs/common';
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
    return await this.testsService.processFormDict(dto);
  }
}
