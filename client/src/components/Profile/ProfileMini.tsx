import { IMAGE_URL } from '@/constants.ts';
import { Typography } from '@components/Typography.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar.tsx';
import { DropdownMenuLabel } from '@components/ui/dropdown-menu.tsx';
import { Link } from '@tanstack/react-router';
import { type Auth } from '@utils/auth.tsx';
import { type FC } from 'react';

type Props = {
  status: Auth['status'];
  profile: Auth['profile'];
};

export const ProfileMini: FC<Props> = ({ status, profile }) => {
  const { username, nickname, avatar } = profile ?? {};

  const name = nickname || username;

  const fallback = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <>
      {status === 'loggedOut' && (
        <DropdownMenuLabel>Authorization</DropdownMenuLabel>
      )}
      {status === 'loggedIn' && (
        <div className="flex flex-col gap-2 items-center">
          <Link to="/profile" preload="intent">
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                src={`${IMAGE_URL}/${avatar}`}
                alt="profile-pic-mini"
              />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </Link>

          <Typography size="small" className="font-medium text-center">
            {name}
          </Typography>
        </div>
      )}
    </>
  );
};
