import { cn } from '@/lib/utils.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { getLetterStyle } from '@components/TypingModule/utils.ts';
import { Typography } from '@components/Typography.tsx';
import { type FC, type RefObject } from 'react';

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
  return (
    <div
      className={cn(
        'flex flex-wrap gap-[16px] overflow-hidden select-none max-h-[calc(3*3rem)]',
        className,
      )}
      ref={refWrapper}
    >
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
                // TODO: come up with a better solution
                const isLetterActive =
                  status === 'active' &&
                  ((!inputValue.length && index < 1) ||
                    index + 1 === inputValue.length);
                /* caret stops flickering **/
                const isCaretIdle = wordIndex > 0 || inputValue.length > 0;

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
                  <div id="letter" key={index} className="relative">
                    {isFocused && isLetterActive && (
                      <div
                        id="letter-caret"
                        className={`absolute h-full w-[2px] bg-yellow ${inputValue.length < 1 ? '' : 'right-0'} ${isCaretIdle ? '' : 'animate-flicker'}`}
                      />
                    )}
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
