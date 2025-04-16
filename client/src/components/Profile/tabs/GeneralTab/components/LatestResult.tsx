import { Alert } from '@/components/Alert';
import { ResultBarChart } from '@/components/charts/ResultBarChart';
import { ResultBarChartData } from '@/components/charts/ResultBarChart/types';
import { Spinner } from '@/components/Spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetUserResults } from '@/queries/user-queries';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';

const LatestResultCard: FC = () => {
  const { data, isLoading, isError } = useGetUserResults(
    { pageIndex: 0, pageSize: 1 },
    { order: 'DESC' },
  );

  const stats = useMemo(() => data?.stats[0], [data]);

  const chartData = useMemo(() => {
    if (!stats) {
      return null;
    }

    return [
      { statKey: 'wpmNet', value: stats.wpm, fill: 'var(--mauve)' },
      { statKey: 'wpmRaw', value: stats.wpmRaw, fill: 'var(--teal)' },
      { statKey: 'mistakes', value: stats.incorrectChars, fill: 'var(--red)' },
    ] as ResultBarChartData[];
  }, [data]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <Spinner />
      </Card>
    );
  }

  if (isError) {
    <Alert
      variant="destructive"
      description="Error loading your records"
      title="Something went wrong"
      className="border-1 border-destructive bg-transparent"
    />;
  }

  if (!chartData) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <CardTitle>Your recent record</CardTitle>
        <CardDescription>
          {dayjs(stats?.timestamp).format('DD.MM.YYYY HH:mm:ss')}
        </CardDescription>
        <CardContent className="p-0">
          <ResultBarChart data={chartData} className="h-[200px] w-full" />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export { LatestResultCard };
