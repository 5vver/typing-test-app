import { FC } from 'react';
import { RecordsDataTable } from '../tables/RecordsDataTable';
import { Typography } from '../Typography';

const UserRecords: FC = () => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <Typography size="h4">Records</Typography>
      <Typography>The list of all of your records.</Typography>

      <RecordsDataTable />
    </div>
  );
};

export { UserRecords };
