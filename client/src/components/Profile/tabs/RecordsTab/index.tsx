import { ResultsDataTable } from '@/components/tables/ResultsDataTable';
import { FC } from 'react';

const RecordsTab: FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ResultsDataTable />
    </div>
  );
};

export { RecordsTab };
