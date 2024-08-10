import type { Word } from '@components/TypingModule/types.ts';
import { Typography } from '@components/Typography.tsx';
import { type FC, type RefObject } from 'react';

type Props = {
  words: Word[];
  inputValue: string;
  refWrapper?: RefObject<HTMLDivElement>;
};

const getLetterStyle = (
  letter: string,
  letterIndex: number,
  inputValue: string,
  isLetterTyped: boolean,
  status: Word['status'],
  wordMistakes?: number[],
) => {
  /* mistakes handle **/
  if (wordMistakes?.includes(letterIndex)) return 'text-red-400';
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

const WordsGrid: FC<Props> = ({ words, inputValue }) => {
  return (
    <div className="px-8 items-center overflow-hidden select-none">
      <div className="flex flex-wrap gap-4 w-9/10 max-h-[calc(3*3rem)]">
        {words.map(
          ({ value, status, mistakes, overTyped }, wordIndex) => {
            //const word = value + (overTyped || '');
            const word = value;
            return (
              <div key={`${word}_${wordIndex}`} className="flex">
                {word.split('').map((letter, index) => {
                  const isWordActive = status === 'active';
                  const isLetterActive =
                    isWordActive && index === inputValue.length;
                  const isLetterTyped =
                    isWordActive && index < inputValue.length;
                  /* caret stops flickering **/
                  const isCaretIdle = wordIndex > 0 || inputValue.length > 0;

                  const letterStyle = getLetterStyle(
                    letter,
                    index,
                    inputValue,
                    isLetterTyped,
                    status,
                    mistakes,
                  );

                  return (
                    <div key={index} className="relative">
                      {isLetterActive && (
                        <div
                          id="letter-caret"
                          className={`absolute h-full w-[2px] bg-yellow ${isCaretIdle ? '' : 'animate-flicker'}`}
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
    </div>
  );
};

export { WordsGrid };
