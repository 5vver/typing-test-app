import { IsNotEmpty } from 'class-validator';

export class CreateWordsDto {
  @IsNotEmpty()
  readonly word: string;
}
