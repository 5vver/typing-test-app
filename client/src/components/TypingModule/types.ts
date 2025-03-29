import { type Dispatch, type RefObject, type SetStateAction } from 'react';

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
  generateWords: (options?: {
    length: number;
    firstActive?: boolean;
  }) => Word[];
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

type AreaFocusData = {
  isFocused: boolean;
  setStatus: Dispatch<SetStateAction<Status>>;
  areaRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  wordList: Word[];
};

export {
  type AreaFocusData,
  type ChartData,
  type GenerateWords,
  type Settings,
  type Stats,
  type Status,
  type Word,
};
