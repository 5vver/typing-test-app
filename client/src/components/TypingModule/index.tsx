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

const words: Word[] = [
  { value: 'red', status: 'active' },
  { value: 'bet', status: 'pending' },
  { value: 'right', status: 'pending' },
  { value: 'choose', status: 'pending' },
  { value: 'name', status: 'pending' },
  { value: 'game', status: 'pending' },
  { value: 'scratch', status: 'pending' },
  { value: 'over', status: 'pending' },
  { value: 'back', status: 'pending' },
  { value: 'damn', status: 'pending' },
  { value: 'lose', status: 'pending' },
  { value: 'stupid', status: 'pending' },
  { value: 'invulnerable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'incredible', status: 'pending' },
  { value: 'unstoppable', status: 'pending' },
  { value: 'unbreakable', status: 'pending' },
  { value: 'unbeatable', status: 'pending' },
  { value: 'unimaginable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'amazing', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
  { value: 'unbelievable', status: 'pending' },
];

const TypingModule: FC = () => {
  const [wordList, setWordList] = useState<Word[]>(words);
  const [activeWord, setActiveWord] = useState<Word | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const goToNextWord = useCallback(() => {
    //const activeWord = wordList.find((word) => word.status === 'active');
    if (!activeWord) throw new Error('No active word found');

    const mistakes = activeWord.value
      .split('')
      .reduce<number[]>((acc, letter, letterIndex) => {
        if (letter !== inputValue[letterIndex]) acc.push(letterIndex);
        return acc;
      }, []);

    const misspelled = mistakes.length > 0;

    setWordList((prev) => {
      const activeWordIndex = prev.findIndex(
        (word) => word.status === 'active',
      );
      if (activeWordIndex === -1) return prev;

      const newWordList: Word[] = prev.map((word, index) => {
        if (index === activeWordIndex)
          return {
            ...word,
            status: misspelled ? 'failed' : 'finished',
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

    // TODO: fix this later
    setTimeout(() => {
      setInputValue(wordList[prevWordIndex].typed ?? '');
    }, 0);
    setWordList((prev) =>
      prev.map((word, index) => {
        if (index === prevWordIndex)
          return { ...word, status: 'active', mistakes: undefined };
        if (index === prevWordIndex + 1) return { ...word, status: 'pending' };
        return word;
      }),
    );
    setActiveWord(wordList.find((word) => word.status === 'active'));
  }, [inputValue, wordList, setInputValue, setWordList, setActiveWord]);

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
      if (e.key === ' ') goToNextWord();
    },
    [isFocused, goToPrevWord, goToNextWord],
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
      const value = e.target.value;
      if (value === ' ') return;
      setInputValue(value);

      /* overflow typed logic **/
      if (value.length >= activeWord.value.length) handleOverTyped(value);
    },
    [activeWord, setInputValue, handleOverTyped],
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

export { TypingModule };
