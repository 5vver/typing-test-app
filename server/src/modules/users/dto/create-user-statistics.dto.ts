export class CreateUserStatisticsDto {
  readonly wpm: number;
  readonly accuracy: number;
  readonly correct_words: number;
  readonly incorrect_words: number;
  readonly total_words: number;
  readonly correct_characters: number;
  readonly missed_characters: number;
  readonly total_characters: number;
}
