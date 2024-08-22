import type {
  GenerateWords,
  Status,
  Word,
} from '@components/TypingModule/types.ts';
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const formWord = (
  word: string,
  index: number,
  firstActive = true,
): Word => {
  if (firstActive && index === 0)
    return { value: word, status: 'active', index };
  return { value: word, status: 'pending', index };
};

export const formWords = (words: string[]): Word[] => {
  return words.map((word, index) => formWord(word, index));
};

const WORD_GAP = 16; // 16px

const getWordWidth = (wordElement: Element): number => {
  const width = wordElement.clientWidth;
  return width + WORD_GAP;
};

export const sliceWordList = (
  setWordList: Dispatch<SetStateAction<Word[]>>,
  wordListContainer: HTMLDivElement,
  generateWordsFn?: GenerateWords['generateWords'],
) => {
  const fulfilledWordNodes = ['#word_finished', '#word_failed'].map((id) =>
    wordListContainer.querySelectorAll(id),
  );

  const fulfilledWordElements = [
    ...(fulfilledWordNodes[0] ? fulfilledWordNodes[0].values() : []),
    ...(fulfilledWordNodes[1] ? fulfilledWordNodes[1].values() : []),
  ];
  const activeWordElement = wordListContainer.querySelector('#word_active');

  const activeWordWidth = activeWordElement
    ? getWordWidth(activeWordElement)
    : 0;
  const containerWidth = wordListContainer.offsetWidth;
  let currentRowWidth = 0;
  let lastIndex = 0;

  for (let i = 0; i < fulfilledWordElements.length; i++) {
    const wordElement = fulfilledWordElements.at(i);
    if (!wordElement) continue;

    const isLast = i === fulfilledWordElements.length - 1;
    const wordWidth = isLast
      ? getWordWidth(wordElement) - WORD_GAP
      : getWordWidth(wordElement);
    const aWordWidth = isLast ? activeWordWidth : 0;
    if (currentRowWidth + wordWidth + aWordWidth > containerWidth) {
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
  missed?: number[],
) => {
  /* mistakes & over typed handle **/
  if (wordMistakes?.includes(letterIndex) || missed?.includes(letterIndex))
    return 'text-red-400';
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

export const useAreaFocus = (
  isFocused: boolean,
  setStatus: Dispatch<SetStateAction<Status>>,
  areaRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
  wordList: Word[],
) => {
  const [isClicking, setIsClicking] = useState(false);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = areaRef.current;
    if (!container) return;

    const handleMouseDown = () => void setIsClicking(true);
    const handleMouseUp = () => void setIsClicking(false);

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [areaRef, setIsClicking]);

  /* when word list updates - clear focus timeout **/
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
    };
  }, [wordList]);

  const onFocus = useCallback(() => {
    const input = inputRef.current;
    if (!input) throw new Error('Input element not found');

    input.focus();

    if (isFocused) return;
    setStatus((prev) => ({ ...prev, isFocused: true }));
  }, [isFocused, inputRef, setStatus]);

  const onBlur = useCallback(() => {
    if (isClicking) return;

    focusTimeoutRef.current = setTimeout(() => {
      setStatus((prev) => ({ ...prev, isFocused: false }));
    }, 500);
  }, [isClicking, setStatus, focusTimeoutRef]);

  return { onFocus, onBlur };
};

/*
 * Calculate net words per minute
 * @param totalTyped - number of total typed words
 * @param incorrectTyped - number of incorrect typed words
 * @param time - time in seconds
 * @returns net words per minute
 */
export const calcNetWpm = (
  totalTyped: number,
  incorrectTyped: number,
  time: number,
) => {
  const netWpm = (totalTyped / 5 - incorrectTyped) / (time / 60);
  return Math.round(netWpm);
};

/*
 * Calculate accuracy
 * @param totalTyped - total typed words
 * @param correctTyped - number of correct typed words
 * @returns accuracy in percentage
 */
export const calcAccuracy = (totalTyped: number, correctTyped: number) => {
  return Math.round((correctTyped / totalTyped) * 100);
};
