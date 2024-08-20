import { SelectWordOptions } from '@/types/test-types.ts';

export type Word = {
  value: string;
  status: 'active' | 'finished' | 'failed' | 'pending';
  mistakes?: number[];
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
  correct: number;
  incorrect: number;
  total: number;
};
