import { Icon } from '@components/Icon';
import { useGenerateWords } from '@components/TypingModule/generate-words.ts';
import { statsAtom, statusAtom } from '@components/TypingModule/store.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { sliceWordList, useAreaFocus } from '@components/TypingModule/utils.ts';
import { WordsGrid } from '@components/TypingModule/WordsGrid.tsx';
import { Typography } from '@components/Typography.tsx';
import { Input } from '@components/ui/input.tsx';
import { useAtom, useSetAtom } from 'jotai';
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props = {
  words: Word[];
};

const TypingCore: FC<Props> = ({ words }) => {
  const { generateWords } = useGenerateWords();

  const [wordList, setWordList] = useState(words);
  const [activeWord, setActiveWord] = useState<Word | undefined>(undefined);
  const [inputValue, setInputValue] = useState('');
  const [isWordTransition, setIsWordTransition] = useState(false);

  const [{ isFocused }, setStatus] = useAtom(statusAtom);
  const setStats = useSetAtom(statsAtom);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* on props.words change - set new word list & clear states **/
  useEffect(() => {
    setWordList(words);
    setActiveWord(undefined);
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.focus();
      setStatus((prev) => ({ ...prev, isFocused: true }));
    }
  }, [words, setWordList, setActiveWord, setInputValue, setStatus, inputRef]);

  useEffect(() => {
    const activeWord = wordList.find((word) => word.status === 'active');
    setActiveWord(activeWord);
  }, [wordList, setActiveWord]);

  useEffect(() => {
    if (!containerRef.current || wordList.length === 0) return;
    sliceWordList(setWordList, containerRef.current, generateWords);
  }, [wordList, setWordList, containerRef, generateWords]);

  const goToNextWord = useCallback(() => {
    if (!activeWord) throw new Error('No active word found');

    const { correct, mistakes, missed } = activeWord.value
      .split('')
      .reduce<{ mistakes: number[]; correct: number[]; missed: number[] }>(
        (acc, letter, letterIndex) => {
          if (!inputValue[letterIndex]) acc.missed.push(letterIndex);
          else if (letter !== inputValue[letterIndex])
            acc.mistakes.push(letterIndex);
          else acc.correct.push(letterIndex);
          return acc;
        },
        { mistakes: [], correct: [], missed: [] },
      );

    const misspelled = mistakes.length > 0;
    const failed = misspelled || !!activeWord.overTyped;

    const activeWordIndex = wordList.findIndex(
      (word) => word.status === 'active',
    );
    const newWordList: Word[] = wordList.map((word, index) => {
      if (index === activeWordIndex)
        return {
          ...word,
          status: failed ? 'failed' : 'finished',
          correct,
          mistakes,
          missed,
          typed: inputValue,
        };
      if (index === activeWordIndex + 1) return { ...word, status: 'active' };
      return word;
    });

    if (failed)
      setStats((prev) => ({
        ...prev,
        incorrectWords: prev.incorrectWords + 1,
        totalWords: prev.totalWords + 1,
        correctChars: prev.correctChars + correct.length,
        incorrectChars: prev.incorrectChars + mistakes.length,
        totalChars: prev.totalChars + correct.length + mistakes.length,
        missedChars: prev.missedChars + missed.length,
      }));
    else
      setStats((prev) => ({
        ...prev,
        correctWords: prev.correctWords + 1,
        totalWords: prev.totalWords + 1,
        correctChars: prev.correctChars + correct.length,
        incorrectChars: prev.incorrectChars + mistakes.length,
        totalChars: prev.totalChars + activeWord.value.length,
        missedChars: prev.missedChars + missed.length,
      }));

    setWordList(newWordList);
    setInputValue('');
  }, [wordList, setWordList, inputValue, setInputValue, activeWord, setStats]);

  const goToPrevWord = useCallback(() => {
    if (inputValue.length > 0 || !activeWord) return;
    const prevWord = wordList[activeWord.index - 1];
    if (!prevWord || prevWord.status !== 'failed') return;

    const correctLength = prevWord.correct?.length ?? 0;
    const incorrectLength = prevWord.mistakes?.length ?? 0;
    const missedLength = prevWord.missed?.length ?? 0;

    setIsWordTransition(true); // in order to prevent onChange event
    setStats((prev) => ({
      ...prev,
      totalWords: prev.totalWords - 1,
      incorrectWords: prev.incorrectWords - 1,
      correctChars: prev.correctChars - correctLength,
      incorrectChars: prev.incorrectChars - incorrectLength,
      totalChars: prev.totalChars - correctLength - incorrectLength,
      missedChars: prev.missedChars - missedLength,
    }));

    setInputValue(prevWord.typed ?? '');
    setWordList((prev) =>
      prev.map((word, index) => {
        if (index === prevWord.index)
          return { ...word, status: 'active', mistakes: undefined };
        if (index === prevWord.index) return { ...word, status: 'pending' };
        return word;
      }),
    );
  }, [
    inputValue,
    wordList,
    activeWord,
    setInputValue,
    setWordList,
    setIsWordTransition,
    setStats,
  ]);

  const handleOverTyped = useCallback(
    (value: string) => {
      if (!activeWord) return;

      setWordList((prev) => {
        const activeWordIndex = prev.findIndex(
          (word) => word.status === 'active',
        );
        if (activeWordIndex === -1) return prev;

        const newWordList: Word[] = prev.map((word, index) => {
          if (index === activeWordIndex)
            return {
              ...word,
              overTyped: value.slice(activeWord.value.length),
            };
          return word;
        });
        return newWordList;
      });
    },
    [activeWord, setWordList],
  );

  const inputListener = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!isFocused) return;

      if (e.key === 'Backspace') goToPrevWord();
      if (e.key === ' ' && inputValue.length > 0) goToNextWord();
      //if (e.ctrlKey && e.key === 'a') e.preventDefault();
    },
    [isFocused, goToPrevWord, goToNextWord, inputValue],
  );

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.addEventListener('keydown', inputListener);

    return () => {
      input.removeEventListener('keydown', inputListener);
    };
  }, [inputRef, inputListener]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!activeWord) return;
      if (isWordTransition) return void setIsWordTransition(false);

      const value = e.target.value;
      if (value === ' ' || value.length - activeWord.value.length > 8) return;
      if (value.length === 0)
        setWordList((prev) => {
          const activeWord = prev.find(({ status }) => status === 'active');
          if (activeWord && activeWord.overTyped)
            activeWord.overTyped = undefined;
          return prev;
        });
      if (value.length > 0) setStatus((prev) => ({ ...prev, isTyping: true }));

      setInputValue(value);

      /* over-typed logic **/
      if (value.length >= activeWord.value.length) handleOverTyped(value);
    },
    [
      activeWord,
      setWordList,
      setInputValue,
      handleOverTyped,
      isWordTransition,
      setIsWordTransition,
      setStatus,
    ],
  );

  const { onFocus, onBlur } = useAreaFocus(
    isFocused,
    setStatus,
    containerRef,
    inputRef,
    wordList,
  );

  return (
    <div className={`w-full h-full relative`} onClick={onFocus}>
      {!isFocused && (
        <div className="absolute text-center top-[50px] w-full z-40 pointer-events-none">
          <Icon name="cursor-arrow-micro" size={20} className="w-full" />
          <Typography size="large" className="font-normal">
            Click here to start typing
          </Typography>
        </div>
      )}

      <WordsGrid
        words={wordList}
        inputValue={inputValue}
        isFocused={isFocused}
        refWrapper={containerRef}
        className={`transition duration-500 ease-in-out ${isFocused ? '' : 'blur-sm'}`}
      />
      <Input
        type="text"
        value={inputValue}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        className="absolute z-50 -bottom-8 left-0 right-0 w-40 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export { TypingCore };
