import type { Word } from '@components/TypingModule/types.ts';
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

const formWords = (words: string[]): Word[] => {
  return words.map((word, index) => {
    if (index === 0) return { value: word, status: 'active' };
    return { value: word, status: 'pending' };
  });
};

type Props = {
  words: string[];
};

const TypingCore: FC<Props> = ({ words }) => {
  const [wordList, setWordList] = useState<Word[]>(formWords(words));
  const [activeWord, setActiveWord] = useState<Word | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [isWordTransition, setIsWordTransition] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

    setWordList((prev) => {
      const activeWordIndex = prev.findIndex(
        (word) => word.status === 'active',
      );
      if (activeWordIndex === -1) return prev;

      const newWordList: Word[] = prev.map((word, index) => {
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
      return newWordList;
    });

    setActiveWord(wordList.find((word) => word.status === 'active'));
    setInputValue('');
  }, [
    wordList,
    setWordList,
    inputValue,
    setInputValue,
    activeWord,
    setActiveWord,
  ]);

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
    setActiveWord(wordList.find((word) => word.status === 'active'));
  }, [
    inputValue,
    wordList,
    setInputValue,
    setWordList,
    setActiveWord,
    setIsWordTransition,
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
      setActiveWord(wordList.find((word) => word.status === 'active'));
    },
    [activeWord, wordList, setWordList, setActiveWord],
  );

  const inputListener = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!isFocused) return;

      if (e.key === 'Backspace') goToPrevWord();
      if (e.key === ' ' && inputValue.length > 0) goToNextWord();
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

  useEffect(() => {
    const activeWord = wordList.find((word) => word.status === 'active');
    setActiveWord(activeWord);
  }, [wordList, setActiveWord]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!activeWord) return;
      if (isWordTransition) return void setIsWordTransition(false);

      const value = e.target.value;
      if (value === ' ') return;
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
      <WordsGrid words={wordList} inputValue={inputValue} />
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
