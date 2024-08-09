import type { Word } from '@components/TypingModule/types.ts';
import { WordsGrid } from '@components/TypingModule/WordsGrid.tsx';
import { Input } from '@components/ui/input.tsx';
import {
  ChangeEvent,
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
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const goToNextWord = useCallback(() => {
    const misspelled = !!wordList.find(
      (word) => word.status === 'active' && word.value !== inputValue,
    );

    setWordList((prev) => {
      const activeWordIndex = prev.findIndex(
        (word) => word.status === 'active',
      );
      if (activeWordIndex === -1) return prev;

      const newWordList: Word[] = prev.map((word, index) => {
        if (index === activeWordIndex)
          return { ...word, status: misspelled ? 'failed' : 'finished' };
        if (index === activeWordIndex + 1) return { ...word, status: 'active' };
        return word;
      });
      return newWordList;
    });
  }, [wordList, setWordList, inputValue]);

  const inputListener = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!isFocused) return;
      if (e.key === ' ') {
        goToNextWord();
        setInputValue('');
      }
    },
    [isFocused, setInputValue, goToNextWord],
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
      const value = e.target.value;
      if (value === ' ') return;
      setInputValue(value);
    },
    [setInputValue],
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
