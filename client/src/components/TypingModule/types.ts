import { SelectWordOptions } from '@/types/test-types.ts';

type Word = {
  value: string;
  status: 'active' | 'finished' | 'failed' | 'pending';
  correct?: number[];
  mistakes?: number[];
  missed?: number[];
  typed?: string;
  overTyped?: string;
};

type GenerateWords = {
  generateWords: (
    options?: SelectWordOptions & { firstActive?: boolean },
  ) => Word[];
  generateWord: () => Word | null;
};

type Status = {
  isTyping: boolean;
  isFinished: boolean;
  isFailed: boolean;
  isFocused: boolean;
};

type Stats = {
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

type ChartData = {
  timestamp: number;
  rawWpm: number;
  netWpm: number;
  mistake?: number;
  mistakeRate?: number;
};

type Settings = {
  timerCount: number;
  words: number;
  dictionary: string;
};

export {
  type ChartData,
  type GenerateWords,
  type Settings,
  type Stats,
  type Status,
  type Word,
};
