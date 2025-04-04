export class GetUserStatisticsDataDto {
  stats: {
    id: string;
    name: string;
    wpm: number;
    correctWords: number;
    incorrectWords: number;
    totalWords: number;
    correctChars: number;
    incorrectChars: number;
    totalChars: number;
    accuracy: number;
    timestamp: string;
  }[];
  total: number;
}
