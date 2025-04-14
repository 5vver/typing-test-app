import { AvatarUploader } from '@/components/Profile/tabs/GeneralTab/components/AvatarUploader';
import { UserNameEdit } from '@/components/Profile/tabs/GeneralTab/components/UserNameEdit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IMAGE_URL } from '@/constants.ts';
import { useGetUserResults } from '@/queries/user-queries';
import { Typography } from '@components/Typography.tsx';
import { useAuth } from '@utils/auth.tsx';
import { type FC } from 'react';

const GeneralTab: FC = () => {
  const { profile: { username, email, nickname, avatar } = {}, refetch } =
    useAuth();

  const { data, isLoading, isError } = useGetUserResults(
    { pageIndex: 0, pageSize: 1 },
    { order: 'ASC' },
  );

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

        <Card className="w-full">
          <CardHeader className="p-4">
            <CardTitle>Recent record</CardTitle>
            <CardDescription>Your latest recorded result.</CardDescription>
            <CardContent>chart here</CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export { GeneralTab };
