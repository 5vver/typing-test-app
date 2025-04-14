import { ResultsChart } from '@/components/charts/ResultsChart';
import { Icon } from '@components/Icon';
import type { Stats } from '@components/TypingModule/types.ts';
import { Typography } from '@components/Typography.tsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/card.tsx';
import { Separator } from '@components/ui/separator.tsx';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';
import { resultChartAtom } from '../store';

type Props = {
  stats: Stats;
  isFinished: boolean;
};

const Results: FC<Props> = ({ stats, isFinished }) => {
  const {
    wpm,
    accuracy,
    correctWords,
    incorrectWords,
    correctChars,
    incorrectChars,
    totalChars,
  } = stats;

  const resultChartData = useAtomValue(resultChartAtom);

  if (!isFinished) {
    return null;
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lavender">Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Typography size="h1" className="text-lavender">
            WPM: {wpm}
          </Typography>
          <Typography size="h1" className="text-lavender">
            Acc: {accuracy}
          </Typography>
        </div>
        <div className="flex justify-between w-full h-full">
          <div className="flex flex-col gap-2 w-1/4 justify-between">
            <div className="flex flex-col gap-2">
              <Separator className="bg-surface2" />
              <div className="flex items-center gap-1">
                <Icon name="check-circle" size={24} color="teal" />
                <Typography size="h3" className="text-mauve">
                  Correct: {correctWords}
                </Typography>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="x-circle" size={24} color="red" />
                <Typography size="h3" className="text-rosewater">
                  Failed: {incorrectWords}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography size="h4" className="text-pink">
                Characters
              </Typography>
              <Separator className="bg-surface2" />
              <Typography>Correct: {correctChars}</Typography>
              <Typography>Failed: {incorrectChars}</Typography>
              <Separator className="bg-surface2" />
              <Typography className="font-medium text-lavender">
                Total: {totalChars}
              </Typography>
            </div>
          </div>

          <div className="w-full h-full">
            <ResultsChart data={resultChartData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Results };
