import { useGenerateWords } from '@components/TypingModule/generate-words.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { sliceWordList } from '@components/TypingModule/utils.ts';
import { WordsGrid } from '@components/TypingModule/WordsGrid.tsx';
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
      if (e.ctrlKey && e.key === 'a') e.preventDefault();
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
      setInputValue(value);

      /* overflow typed logic **/
      if (value.length >= activeWord.value.length) handleOverTyped(value);
    },
    [
      activeWord,
      setInputValue,
      handleOverTyped,
      isWordTransition,
      setIsWordTransition,
    ],
  );

  return (
    <div className="flex flex-col w-full h-full">
      <WordsGrid
        words={wordList}
        inputValue={inputValue}
        refWrapper={containerRef}
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
      />
    </div>
  );
};

export { TypingCore };
