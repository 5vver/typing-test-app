import { UserNameEdit } from '@components/Profile/tabs/General/UserNameEdit.tsx';
import { Typography } from '@components/Typography.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar.tsx';
import { useAuth } from '@utils/auth.tsx';
import { type FC } from 'react';

const GeneralTab: FC = () => {
  const { profile: { username, email, nickname } = {}, refetch } = useAuth();

  const name = nickname || username || '';

  const fallback = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="flex gap-2 overflow-x-hidden">
      <Avatar className="w-32 h-32">
        <AvatarImage
          src="http://192.168.0.105:5000/public/a.jpg"
          alt="profile-pic-mini"
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col w-full">
        <UserNameEdit name={name} refetch={refetch} />
        <Typography size="muted">{email}</Typography>
      </div>
    </div>
  );
};

export { GeneralTab };
