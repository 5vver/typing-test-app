import type { Word } from '@components/TypingModule/types.ts';
import { type Dispatch, type SetStateAction } from 'react';

export const formWords = (words: string[]): Word[] => {
  return words.map((word, index) => {
    if (index === 0) return { value: word, status: 'active' };
    return { value: word, status: 'pending' };
  });
};

const getWordWidth = (wordElement: Element): number => {
  const width = wordElement.clientWidth;
  const gap = 16; // 16px
  return width + gap;
};

export const sliceWordList = (
  setWordList: Dispatch<SetStateAction<Word[]>>,
  wordListContainer: HTMLDivElement,
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
  setWordList((prev) => prev.slice(lastIndex + 1));
};
