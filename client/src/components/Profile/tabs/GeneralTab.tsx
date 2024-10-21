import { Typography } from '@components/Typography.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar.tsx';
import { Auth } from '@utils/auth.tsx';
import { FC } from 'react';

type Props = {
  auth: Auth;
};

const GeneralTab: FC<Props> = ({ auth }) => {
  const { profile: { username, role, email } = {} } = auth;

  const fallback = username
    ? username
        .split(' ')
        .map((s) => s[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="flex gap-2">
      <Avatar className="w-32 h-32">
        <AvatarImage
          src="http://192.168.0.105:5000/public/a.jpg"
          alt="profile-pic-mini"
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col w-full">
        <Typography size="large">{username}</Typography>
        <Typography size="muted">{email}</Typography>
      </div>
    </div>
  );
};

export { GeneralTab };
