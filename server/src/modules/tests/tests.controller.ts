import { Body, Controller, Post } from '@nestjs/common';
import { TestsService } from './tests.service';
import { SelectWordsOptionsDto } from './dto/select-words-options.dto';

@Controller('/tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/getRandomWords')
  async selectRandomWords(@Body() options: SelectWordsOptionsDto) {
    return await this.testsService.getRandomWords(options);
  }
}
