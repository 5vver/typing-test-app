import type { GenerateWords, Word } from '@components/TypingModule/types.ts';
import { type Dispatch, type SetStateAction } from 'react';

export const formWord = (
  word: string,
  index: number,
  firstActive = true,
): Word => {
  if (firstActive && index === 0) return { value: word, status: 'active' };
  return { value: word, status: 'pending' };
};

export const formWords = (words: string[]): Word[] => {
  return words.map((word, index) => formWord(word, index));
};

const getWordWidth = (wordElement: Element): number => {
  const width = wordElement.clientWidth;
  const gap = 16; // 16px
  return width + gap;
};

export const sliceWordList = (
  setWordList: Dispatch<SetStateAction<Word[]>>,
  wordListContainer: HTMLDivElement,
  generateWordsFn?: GenerateWords['generateWords'],
) => {
  const fulfilledWordNodes = ['#word_finished', '#word_failed'].map((id) =>
    wordListContainer.querySelectorAll(id),
  );
  const pendingWordNodes = wordListContainer.querySelectorAll('#word_pending');

  const fulfilledWordElements = [
    ...(fulfilledWordNodes[0] ? fulfilledWordNodes[0].values() : []),
    ...(fulfilledWordNodes[1] ? fulfilledWordNodes[1].values() : []),
  ];
  const pendingWordElement = [...pendingWordNodes.values()][0];

  const pendingWordWidth = getWordWidth(pendingWordElement);
  const containerWidth = wordListContainer.offsetWidth;
  let currentRowWidth = 0;
  let lastIndex = 0;

  for (let i = 0; i < fulfilledWordElements.length; i++) {
    const wordElement = fulfilledWordElements.at(i);
    if (!wordElement) continue;
    const wordWidth = getWordWidth(wordElement);
    if (currentRowWidth + pendingWordWidth + wordWidth > containerWidth) {
      lastIndex = i;
      break;
    }
    currentRowWidth += wordWidth;
  }

  if (!lastIndex) return;
  setWordList((prev) => {
    const newWordList = prev.slice(lastIndex + 1);
    if (generateWordsFn) {
      const newWords = generateWordsFn({
        count: lastIndex + 1,
        firstActive: false,
      });
      if (newWords.length > 0) newWordList.push(...newWords);
    }
    return newWordList;
  });
};

export const getLetterStyle = (
  letter: string,
  letterIndex: number,
  inputValue: string,
  isLetterTyped: boolean,
  status: Word['status'],
  isOverTyped: boolean,
  wordMistakes?: number[],
) => {
  /* mistakes & over typed handle **/
  if (wordMistakes?.includes(letterIndex)) return 'text-red-400';
  else if (isOverTyped) return 'text-red-300';
  else if (wordMistakes && wordMistakes.length > 0) return 'text-lavender';

  /* statuses handle **/
  if (status === 'finished') return 'text-lavender';
  if (status === 'failed') return 'text-red-400';
  if (status === 'pending') return 'text-subtext0';

  // emphasize active latter
  //if (isLetterActive && !inputValue[letterIndex]) return 'text-blue';

  /* wrong typed letter **/
  if (isLetterTyped && letter !== inputValue[letterIndex]) {
    return 'text-red-400';
  }
  /* correct typed letter **/
  if (letter === inputValue[letterIndex]) {
    return 'text-lavender';
  }
  /* active pending letter **/
  return 'text-subtext0';
};
