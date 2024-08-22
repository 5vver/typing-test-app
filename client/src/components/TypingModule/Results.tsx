import type { Stats } from '@components/TypingModule/types.ts';
import { Typography } from '@components/Typography.tsx';
import { Separator } from '@components/ui/separator.tsx';
import { type FC } from 'react';

type Props = {
  stats: Stats;
};

const Results: FC<Props> = ({ stats }) => {
  const {
    wpm,
    accuracy,
    correctWords,
    incorrectWords,
    correctChars,
    incorrectChars,
    totalChars,
  } = stats;

  return (
    <div className="flex flex-col gap-4 bg-surface0 p-4 rounded-md">
      <Typography size="h4" className="text-lavender">
        Results
      </Typography>
      <Typography>CorrectWords: {correctWords}</Typography>
      <Typography>FailedWords: {incorrectWords}</Typography>
      <Separator className="bg-surface2" />
      <Typography>CorrectCharacters: {correctChars}</Typography>
      <Typography>FailedCharacters: {incorrectChars}</Typography>
      <Typography>TotalCharacters: {totalChars}</Typography>
      <Separator className="bg-surface2" />
      <Typography>WPM: {wpm}</Typography>
      <Typography>Accuracy: {accuracy}</Typography>
    </div>
  );
};

export { Results };
