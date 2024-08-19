import type { GenerateWords, Word } from '@components/TypingModule/types.ts';
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
    const wordWidth = getWordWidth(wordElement);
    const aWordWidth =
      i === fulfilledWordElements.length - 1 ? activeWordWidth : 0; // last word element
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

export const useAreaFocus = (
  isFocused: boolean,
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  areaRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
) => {
  const [isClicking, setIsClicking] = useState(false);

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

  const onFocus = useCallback(() => {
    const input = inputRef.current;
    if (!input) throw new Error('Input element not found');

    input.focus();

    if (isFocused) return;
    setIsFocused(true);
  }, [isFocused, inputRef, setIsFocused]);

  const onBlur = useCallback(() => {
    if (isClicking) return;

    const focusTimeout = setTimeout(() => {
      setIsFocused(false);
    }, 500);

    return () => {
      clearTimeout(focusTimeout);
    };
  }, [isClicking, setIsFocused]);

  return { onFocus, onBlur };
};
