import { ResultsChart } from '@components/TypingModule/components/ResultsChart.tsx';
import type { Stats } from '@components/TypingModule/types.ts';
import { Typography } from '@components/Typography.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/card.tsx';
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
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lavender">Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <ResultsChart />
        <Typography>CorrectWords: {correctWords}</Typography>
        <Typography>FailedWords: {incorrectWords}</Typography>
        <Separator className="bg-surface2" />
        <Typography>CorrectCharacters: {correctChars}</Typography>
        <Typography>FailedCharacters: {incorrectChars}</Typography>
        <Typography>TotalCharacters: {totalChars}</Typography>
        <Separator className="bg-surface2" />
        <Typography>WPM: {wpm}</Typography>
        <Typography>Accuracy: {accuracy}</Typography>
      </CardContent>
    </Card>
  );
};

export { Results };
