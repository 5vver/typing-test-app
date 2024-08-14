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
      {words.map(({ value, status, mistakes, overTyped }, wordIndex) => {
        const word = value + (overTyped || '');
        //const word = value;
        return (
          <div
            id={`word_${status}`}
            key={`${word}_${wordIndex}`}
            className="flex"
          >
            {word.split('').map((letter, index) => {
              const isWordActive = status === 'active';
              // TODO: come up with a better solution
              const isLetterActive =
                isWordActive &&
                ((!inputValue.length && index < 1) ||
                  index + 1 === inputValue.length);
              const isLetterTyped = isWordActive && index < inputValue.length;
              const isOverTyped = index >= value.length;
              /* caret stops flickering **/
              const isCaretIdle = wordIndex > 0 || inputValue.length > 0;

              const letterStyle = getLetterStyle(
                letter,
                index,
                inputValue,
                isLetterTyped,
                status,
                isOverTyped,
                mistakes,
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
      })}
    </div>
  );
};

export { WordsGrid };
