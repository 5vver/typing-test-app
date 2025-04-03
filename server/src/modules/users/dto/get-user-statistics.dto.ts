import { IsNotEmpty } from 'class-validator';

export class GetUserStatisticsDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  pageSize: number;
  filter?: {
    name?: string;
    dateFrom?: string;
    dateTo?: string;
    wpmFrom?: number;
    wpmTo?: number;
  };
}
