import { AvatarUploader } from '@/components/Profile/tabs/GeneralTab/components/AvatarUploader';
import { UserNameEdit } from '@/components/Profile/tabs/GeneralTab/components/UserNameEdit';
import { IMAGE_URL } from '@/constants.ts';
import { Typography } from '@components/Typography.tsx';
import { useAuth } from '@utils/auth.tsx';
import { type FC } from 'react';
import { LatestResultCard } from './components/LatestResult';

const GeneralTab: FC = () => {
  const { profile: { username, email, nickname, avatar } = {}, refetch } =
    useAuth();

  const name = nickname || username || '';

  const fallback = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((s) => s[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="flex gap-2 overflow-x-hidden">
      <AvatarUploader
        pictureUrl={`${IMAGE_URL}/${avatar}`}
        fallback={fallback}
        refetch={refetch}
      />

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col w-full">
          <UserNameEdit name={name} refetch={refetch} />
          <Typography size="muted">{email}</Typography>
        </div>

        <LatestResultCard />
      </div>
    </div>
  );
};

export { GeneralTab };
