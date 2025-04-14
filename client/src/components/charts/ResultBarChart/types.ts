import { resultBarChartKeys } from './constants';

type ResultBarChartData = {
  value: number;
  statKey: (typeof resultBarChartKeys)[number];
  fill?: string;
};

export type { ResultBarChartData };
