import { useAuth } from '@/utils/auth';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const WithAuth: FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (auth.status === 'loggedOut') {
    return null;
  }

  return children;
};

export { WithAuth };
