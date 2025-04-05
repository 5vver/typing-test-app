import { useGetUserResults } from '@/queries/user-queries';
import { UserStats } from '@/types/user-types';
import {
  getSortedRowModel,
  PaginationState,
  SortingState,
  TableOptions,
} from '@tanstack/react-table';
import { FC, useMemo, useState } from 'react';
import { PaginationDataTable } from '../PaginationDataTable';
import { columns } from './columns';

const ResultsDataTable: FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const { data, isFetching, isLoading, isError } =
    useGetUserResults(pagination);

  const tableOptions = useMemo(
    () =>
      ({
        state: {
          sorting,
          pagination,
        },
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        rowCount: data?.total ?? 0,
        manualPagination: true,
        debugTable: true,
      }) as TableOptions<UserStats>,
    [data, sorting, setSorting],
  );

  const statsData = useMemo(() => data?.stats ?? [], [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !statsData?.length) {
    return null;
  }

  return (
    <PaginationDataTable
      data={statsData}
      columns={columns}
      tableOptions={tableOptions}
    />
  );
};

export { ResultsDataTable };
