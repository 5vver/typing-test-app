import { cn } from '@/lib/utils.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { getLetterStyle } from '@components/TypingModule/utils.ts';
import { Typography } from '@components/Typography.tsx';
import {
  type FC,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { debounce } from 'lodash';

type Props = {
  words: Word[];
  inputValue: string;
  isFocused: boolean;
  refWrapper?: RefObject<HTMLDivElement>;
  className?: string;
};

const WordsGrid: FC<Props> = ({
  words,
  inputValue,
  isFocused,
  refWrapper,
  className,
}) => {
  const [isCaretIdle, setIsCaretIdle] = useState(true);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const { top, left } = caretPosition;

  useEffect(() => {
    if (!isFocused) return;

    const container = refWrapper?.current;
    const activeWord = container?.querySelector('#word_active');
    const activeLetter = activeWord?.querySelector('#letter_active');

    if (container && activeWord) {
      let top;
      let left;

      const containerRect = container.getBoundingClientRect();
      const activeWordRect = activeWord.getBoundingClientRect();
      const activeLetterRect = activeLetter?.getBoundingClientRect();

      /* active letter presents **/
      if (activeLetterRect) {
        top = activeLetterRect.top - containerRect.top;
        left = activeLetterRect.left - containerRect.left;
        return void setCaretPosition({ top, left });
      }

      top = activeWordRect.top - containerRect.top;
      left = activeWordRect.right - containerRect.left;
      setCaretPosition({ top, left });
    }
  }, [isFocused, inputValue, refWrapper, words]);

  const debouncedSetCaretIdle = useCallback(() => {
    debounce(() => setIsCaretIdle(true), 350)();
  }, [setIsCaretIdle]);

  useEffect(() => {
    if (isFocused && inputValue.length > 0) {
      return void setIsCaretIdle(false);
    }
    debouncedSetCaretIdle();
  }, [isFocused, inputValue, debouncedSetCaretIdle, setIsCaretIdle]);

  return (
    <div
      className={cn(
        'relative flex flex-wrap gap-[16px] overflow-hidden select-none max-h-[calc(3*3rem)]',
        className,
      )}
      ref={refWrapper}
    >
      <motion.div
        id="letter_caret"
        className={`absolute h-[36px] w-[2px] bg-yellow ${isCaretIdle ? 'animate-flicker' : ''} ${isFocused ? 'block' : 'hidden'}`}
        animate={{ top, left }}
        transition={{ type: 'keyframes', duration: 0.16 }}
      />

      {words.map(
        ({ value, status, mistakes, missed, overTyped, typed }, wordIndex) => {
          const word = value + (overTyped || '');
          const failedEmphasis = status === 'failed' ? 'border-red-400' : '';

          return (
            <div
              id={`word_${status}`}
              key={`${word}_${wordIndex}`}
              className={cn(
                'flex border-b-2 border-transparent',
                failedEmphasis,
              )}
            >
              {word.split('').map((letter, index) => {
                const isLetterActive =
                  status === 'active' &&
                  ((!inputValue.length && index < 1) ||
                    index === inputValue.length);

                const letterStyle = getLetterStyle(
                  letter,
                  index,
                  inputValue,
                  value,
                  status,
                  mistakes,
                  missed,
                  typed,
                );

                return (
                  <div
                    id={`letter_${isLetterActive ? 'active' : 'idle'}`}
                    key={index}
                  >
                    <Typography
                      size="type"
                      className={`${letterStyle} transition-colors ease-in-out delay-0 duration-75`}
                    >
                      {letter}
                    </Typography>
                  </div>
                );
              })}
            </div>
          );
        },
      )}
    </div>
  );
};

export { WordsGrid };
