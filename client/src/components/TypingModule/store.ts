import type { WordData } from '@/types/test-types.ts';
import type {
  ChartData,
  Stats,
  Status,
} from '@components/TypingModule/types.ts';
import { atom } from 'jotai';

const wordsDictAtom = atom<WordData[]>([]);

const blankStatus: Status = {
  isTyping: false,
  isFinished: false,
  isFailed: false,
  isFocused: false,
};
const statusAtom = atom<Status>(blankStatus);

const blankStats: Stats = {
  wpm: 0,
  accuracy: 0,
  correctWords: 0,
  incorrectWords: 0,
  totalWords: 0,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  missedChars: 0,
};
const statsAtom = atom<Stats>(blankStats);

const resultChartAtom = atom<ChartData[]>([]);

export {
  blankStats,
  blankStatus,
  resultChartAtom,
  statsAtom,
  statusAtom,
  wordsDictAtom,
};
