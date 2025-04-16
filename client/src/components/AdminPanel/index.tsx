import { FC } from 'react';
import { DictJsonForm } from './components/DictJsonForm';

const AdminPanel: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DictJsonForm />
    </div>
  );
};
