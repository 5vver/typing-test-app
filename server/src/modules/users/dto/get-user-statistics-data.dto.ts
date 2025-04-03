export class GetUserStatisticsDataDto {
  id: string;
  wpm: number;
  correctWords: number;
  incorrectWords: number;
  totalWords: number;
  correctCharacters: number;
  incorrectCharacters: number;
  totalCharacters: number;
  accuracy: number;
  timestamp: string;
}
