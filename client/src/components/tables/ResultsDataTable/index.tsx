import { useGetUserResults } from '@/queries/user-queries';
import { FC } from 'react';
import { BaseDataTable } from '../BaseDataTable';
import { columns } from './columns';

const ResultsDataTable: FC = () => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetUserResults(2);

  const statsData = data?.pages.at(-1)?.stats;
  console.log(statsData);
  const isLoading = isFetching || isFetchingNextPage;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !statsData?.length) {
    return null;
  }

  return <BaseDataTable data={statsData} columns={columns} />;
};

export { ResultsDataTable };
