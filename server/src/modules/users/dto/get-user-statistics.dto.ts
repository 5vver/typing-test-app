import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class GetUserStatisticsDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  pageSize: number;
  @IsObject()
  @IsOptional()
  filter?: {
    name?: string;
    dateFrom?: string;
    dateTo?: string;
    wpmFrom?: number;
    wpmTo?: number;
  };
}
