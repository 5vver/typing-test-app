import { SelectWordOptions } from '@/types/test-types.ts';

export type Word = {
  value: string;
  index: number;
  status: 'active' | 'finished' | 'failed' | 'pending';
  correct?: number[];
  mistakes?: number[];
  missed?: number[];
  typed?: string;
  overTyped?: string;
};

export type GenerateWords = {
  generateWords: (
    options?: SelectWordOptions & { firstActive?: boolean },
  ) => Word[];
  generateWord: () => Word | null;
};

export type Status = {
  isTyping: boolean;
  isFinished: boolean;
  isFailed: boolean;
  isFocused: boolean;
};

export type Stats = {
  wpm: number;
  accuracy: number;
  correctWords: number;
  incorrectWords: number;
  totalWords: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  totalChars: number;
};

export type ChartData = {
  timestamp: number;
  rawWpm: number;
  netWpm: number;
};
