import { SelectWordOptions, WordData } from '@/types/test-types.ts';
import type { GenerateWords, Word } from '@components/TypingModule/types.ts';
import { formWord } from '@components/TypingModule/utils.ts';
import { atom, useAtomValue } from 'jotai';

const wordsDictAtom = atom<WordData[]>([]);

const useGenerateWords = (): GenerateWords => {
  const wordsDict = useAtomValue(wordsDictAtom);

  const generateWords = (
    options?: SelectWordOptions & { firstActive?: boolean },
  ): Word[] => {
    if (!wordsDict.length) return [];

    const { count = wordsDict.length, firstActive = true } = options ?? {};
    const words: Word[] = [];

    for (let i = 0; i < count; i++) {
      const randomNumber = Math.ceil(Math.random() * (wordsDict.length - 1));
      const word = wordsDict[randomNumber].word;
      words.push(formWord(word, i, firstActive));
    }

    return words;
  };

  const generateWord = (): Word | null => {
    if (!wordsDict.length) return null;

    const randomNumber = Math.ceil(Math.random() * (wordsDict.length - 1));
    const word = wordsDict[randomNumber].word;
    return formWord(word, 99);
  };

  return { generateWords, generateWord };
};

export { useGenerateWords, wordsDictAtom };
