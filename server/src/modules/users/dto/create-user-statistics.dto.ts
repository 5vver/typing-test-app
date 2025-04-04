import { IsNotEmpty } from 'class-validator';

export class CreateUserStatisticsDto {
  @IsNotEmpty()
  readonly wpm: number;
  @IsNotEmpty()
  readonly accuracy: number;
  @IsNotEmpty()
  readonly correct_words: number;
  @IsNotEmpty()
  readonly incorrect_words: number;
  @IsNotEmpty()
  readonly total_words: number;
  @IsNotEmpty()
  readonly correct_characters: number;
  @IsNotEmpty()
  readonly missed_characters: number;
  @IsNotEmpty()
  readonly total_characters: number;
  @IsNotEmpty()
  readonly testId: string;
}
