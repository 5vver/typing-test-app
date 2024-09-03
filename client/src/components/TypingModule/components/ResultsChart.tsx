import { resultChartAtom } from '@components/TypingModule/store.ts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart.tsx';
import { getDefaultStore, useAtomValue } from 'jotai';
import * as React from 'react';
import { ComponentProps, type FC } from 'react';
import { Area, AreaChart, CartesianGrid, Dot, XAxis, YAxis } from 'recharts';

const chartConfig = {
  rawWpm: {
    label: 'Raw',
    color: 'var(--teal)',
  },
  netWpm: {
    label: 'WPM',
    color: 'var(--mauve)',
  },
  mistake: {
    label: 'Mistakes',
    color: 'var(--red)',
  },
  label: { label: 'Statistic' },
} satisfies ChartConfig;

const store = getDefaultStore();

type TooltipFormatter = NonNullable<
  ComponentProps<typeof ChartTooltip>['formatter']
>;
const TooltipFormatter: TooltipFormatter = (value, name, item) => {
  const indicatorColor = item.payload.fill || item.color;

  const resultChartValue = store.get(resultChartAtom);
  const mistakeRate = resultChartValue.find(
    ({ timestamp }) => item.payload.timestamp === timestamp,
  )?.mistakeRate;
  const val = name === 'mistake' && mistakeRate ? mistakeRate : value;

  return (
    <>
      <div
        className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5"
        style={
          {
            '--color-bg': indicatorColor,
            '--color-border': indicatorColor,
          } as React.CSSProperties
        }
      />
      <div className="flex flex-1 justify-between leading-none items-center">
        <div className="grid gap-1.5">
          <span className="text-muted-foreground">
            {chartConfig[name as keyof typeof chartConfig]?.label}
          </span>
        </div>
        {value && (
          <span className="font-mono font-medium tabular-nums text-foreground">
            {val.toLocaleString()}
          </span>
        )}
      </div>
    </>
  );
};

const ResultsChart: FC = () => {
  const resultChart = useAtomValue(resultChartAtom);

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        data={resultChart}
        margin={{
          left: 12,
          right: 12,
          top: 12,
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
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelKey="label" />}
          formatter={TooltipFormatter}
        />

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
              stopColor="var(--color-netWpm)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMistake" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mistake)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mistake)"
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="netWpm"
          type="natural"
          fill="url(#fillNet)"
          fillOpacity={0.4}
          stroke="var(--color-netWpm)"
          stackId="netWpmStack"
          yAxisId="right"
        />
        <Area
          dataKey="rawWpm"
          type="natural"
          fill="url(#fillRaw)"
          fillOpacity={0.4}
          stroke="var(--color-rawWpm)"
          stackId="rawWpmStack"
          yAxisId="left"
        />
        <Area
          dataKey="mistake"
          type="natural"
          stroke="var(--color-mistake)"
          fill="url(#fillMistake)"
          stackId="mistakeStack"
          yAxisId="left"
          dot={<Dot r={4} fill="var(--color-mistake)" />}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export { ResultsChart };
