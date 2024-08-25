import { resultChartAtom } from '@components/TypingModule/store.ts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart.tsx';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  rawWpm: {
    label: 'Raw',
    color: 'var(--teal)',
  },
  netWpm: {
    label: 'WPM',
    color: 'var(--mauve)',
  },
} satisfies ChartConfig;

const ResultsChart: FC = () => {
  const resultChart = useAtomValue(resultChartAtom);

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        data={resultChart}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={5}
          label={{
            value: 'Words per minute',
            position: 'insideLeft',
            angle: -90,
            style: { textAnchor: 'middle', fill: 'var(--mauve)' },
          }}
        />
        <YAxis
          yAxisId="right"
          tick={false}
          tickLine={false}
          axisLine={false}
          orientation="right"
          label={{
            value: 'Raw words per minute',
            position: 'insideRight',
            angle: -90,
            offset: 40,
            style: { textAnchor: 'middle', fill: 'var(--teal)' },
          }}
        />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          // tickFormatter={(value) => String(value).slice(0, 2)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        <defs>
          <linearGradient id="fillRaw" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-rawWpm)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-rawWpm)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillNet" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-netWpm)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-rawWpm)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="netWpm"
          type="natural"
          fill="url(#fillNet)"
          fillOpacity={0.4}
          stroke="var(--color-netWpm)"
          stackId="a"
          yAxisId="right"
        />
        <Area
          dataKey="rawWpm"
          type="natural"
          fill="url(#fillRaw)"
          fillOpacity={0.4}
          stroke="var(--color-rawWpm)"
          stackId="a"
          yAxisId="left"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export { ResultsChart };
