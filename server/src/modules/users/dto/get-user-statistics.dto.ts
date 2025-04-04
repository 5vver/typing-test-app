import { IsNotEmpty, IsObject } from 'class-validator';

export class GetUserStatisticsDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  pageSize: number;
  @IsObject()
  filter?: {
    name?: string;
    dateFrom?: string;
    dateTo?: string;
    wpmFrom?: number;
    wpmTo?: number;
  };
}
