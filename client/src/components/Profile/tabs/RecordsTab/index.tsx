import { RecordsDataTable } from '@/components/tables/RecordsDataTable';
import { Typography } from '@/components/Typography';
import { FC } from 'react';

const RecordsTab: FC = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-start overflow-auto">
      <Typography size="h4">Records</Typography>
      <RecordsDataTable />
    </div>
  );
};

export { RecordsTab };
