import { ResultsDataTable } from '@/components/tables/ResultsDataTable';
import { Typography } from '@/components/Typography';
import { FC } from 'react';

const RecordsTab: FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-start overflow-auto">
      <Typography size="h4">Records</Typography>
      <ResultsDataTable />
    </div>
  );
};

export { RecordsTab };
