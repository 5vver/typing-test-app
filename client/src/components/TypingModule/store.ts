import type { WordData } from '@/types/test-types.ts';
import type { Stats, Status } from '@components/TypingModule/types.ts';
import { atom } from 'jotai';

const wordsDictAtom = atom<WordData[]>([]);

const statusAtom = atom<Status>({
  isTyping: false,
  isFinished: false,
  isFailed: false,
  isFocused: false,
});

const statsAtom = atom<Stats>({
  wpm: 0,
  accuracy: 0,
  correct: 0,
  incorrect: 0,
  total: 0,
});

export { statsAtom, statusAtom, wordsDictAtom };
