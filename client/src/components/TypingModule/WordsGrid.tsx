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
) => {
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
        {words.map(({ value: word, status }, index) => (
          <div key={`${word}_${index}`} className="flex">
            {word.split('').map((letter, index) => {
              const isWordActive = status === 'active';
              const isLetterActive = isWordActive && index <= inputValue.length;
              const isLetterTyped = isWordActive && index < inputValue.length;
              
              const letterStyle = getLetterStyle(
                letter,
                index,
                inputValue,
                isLetterTyped,
                status
              );

              return (
                <Typography key={index} size="type" className={letterStyle}>
                  {letter}
                </Typography>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export { WordsGrid };
