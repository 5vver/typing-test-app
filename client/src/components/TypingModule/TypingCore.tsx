import { Icon } from '@components/Icon';
import { useGenerateWords } from '@components/TypingModule/generate-words.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { sliceWordList } from '@components/TypingModule/utils.ts';
import { WordsGrid } from '@components/TypingModule/WordsGrid.tsx';
import { Typography } from '@components/Typography.tsx';
import { Input } from '@components/ui/input.tsx';
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const TypingCore: FC = () => {
  const { generateWords } = useGenerateWords();

  const [wordList, setWordList] = useState(generateWords());
  const [activeWord, setActiveWord] = useState<Word | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [isWordTransition, setIsWordTransition] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    const mistakes = activeWord.value
      .split('')
      .reduce<number[]>((acc, letter, letterIndex) => {
        if (letter !== inputValue[letterIndex]) acc.push(letterIndex);
        return acc;
      }, []);

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
          mistakes,
          typed: inputValue,
        };
      if (index === activeWordIndex + 1) return { ...word, status: 'active' };
      return word;
    });

    setWordList(newWordList);
    setInputValue('');
  }, [wordList, setWordList, inputValue, setInputValue, activeWord]);

  const goToPrevWord = useCallback(() => {
    if (inputValue.length > 0) return;
    const prevWordIndex =
      wordList.findIndex((word) => word.status === 'active') - 1;
    if (prevWordIndex < 0 || wordList[prevWordIndex].status !== 'failed')
      return;

    setIsWordTransition(true); // in order to prevent onChange event

    setInputValue(wordList[prevWordIndex].typed ?? '');
    setWordList((prev) =>
      prev.map((word, index) => {
        if (index === prevWordIndex)
          return { ...word, status: 'active', mistakes: undefined };
        if (index === prevWordIndex + 1) return { ...word, status: 'pending' };
        return word;
      }),
    );
  }, [inputValue, wordList, setInputValue, setWordList, setIsWordTransition]);

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
      setInputValue(value);

      /* overflow typed logic **/
      if (value.length >= activeWord.value.length) handleOverTyped(value);
    },
    [
      activeWord,
      setWordList,
      setInputValue,
      handleOverTyped,
      isWordTransition,
      setIsWordTransition,
    ],
  );

  const onFocus = useCallback(() => {
    const input = inputRef.current;

    if (!input) throw new Error('Input element not found');

    setIsFocused(true);
    input.focus();
  }, [inputRef, setIsFocused]);

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
        className={`${isFocused ? '' : 'blur-sm'}`}
      />
      <Input
        type="text"
        value={inputValue}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={onChange}
        ref={inputRef}
        autoFocus
        className="absolute z-50 -bottom-8 left-0 right-0 w-40 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export { TypingCore };
