import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ComponentProps, FC } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { ResultBarChartData } from './types';

const chartConfig = {
  wpmNet: {
    label: 'WPM',
    color: 'var(--mauve)',
  },
  wpmRaw: {
    label: 'Raw',
    color: 'var(--teal)',
  },
  mistakes: {
    label: 'Mistakes',
    color: 'var(--red)',
  },
} satisfies ChartConfig;

type TooltipFormatter = NonNullable<
  ComponentProps<typeof ChartTooltip>['formatter']
>;
const tooltipFormatter: TooltipFormatter = (value, name, item) => {
  const indicatorColor = item.payload.fill || item.color;
  const label =
    chartConfig[item.payload.statKey as keyof typeof chartConfig]?.label;

  return (
    <>
      <div
        className="shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg) h-2.5 w-2.5"
        style={
          {
            '--color-bg': indicatorColor,
            '--color-border': indicatorColor,
          } as React.CSSProperties
        }
      />
      <div className="flex flex-1 justify-between leading-none items-center">
        <div className="grid gap-1.5">
          <span className="text-muted-foreground">{label}</span>
        </div>

        {value && (
          <span className="font-mono font-medium tabular-nums text-foreground">
            {value.toLocaleString()}
          </span>
        )}
      </div>
    </>
  );
};

type Props = {
  data: ResultBarChartData[];
  className?: string;
};

const ResultBarChart: FC<Props> = ({ data, className }) => {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 6 }}
      >
        <YAxis
          dataKey="statKey"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
          formatter={tooltipFormatter}
        />
        <Bar dataKey="value" layout="vertical" radius={5}>
          {/* <LabelList */}
          {/*   dataKey="value" */}
          {/*   position="right" */}
          {/*   offset={8} */}
          {/*   className="fill-foreground" */}
          {/*   fontSize={12} */}
          {/* /> */}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export { ResultBarChart };
