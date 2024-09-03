import { Icon } from '@components/Icon';
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
            <ResultsChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Results };
