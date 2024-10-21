import { DictJsonForm } from '@components/AdminPanel/DictJsonForm.tsx';
import { AccountTab } from '@components/Profile/tabs/AccountTab.tsx';
import { GeneralTab } from '@components/Profile/tabs/GeneralTab.tsx';
import { Typography } from '@components/Typography.tsx';
import { Separator } from '@components/ui/separator.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/tabs.tsx';
import { type Auth } from '@utils/auth.tsx';
import { type FC } from 'react';

type Props = {
  auth: Auth;
};

export const Profile: FC<Props> = ({ auth }) => {
  // need to useQuery getProfile here to get all the user's info

  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex h-full gap-2"
    >
      <div className="flex-1 flex flex-col p-4 bg-surface0 rounded-lg">
        <Typography size="h3" className="mb-4 ml-4">
          Settings
        </Typography>

        <Separator orientation="horizontal" className="bg-surface1" />

        <TabsList className="flex flex-col flex-1 p-4 bg-surface0 rounded-lg justify-start">
          <TabsTrigger value="general" className="w-full justify-start text-md">
            General
          </TabsTrigger>
          <TabsTrigger value="account" className="w-full justify-start text-md">
            Account
          </TabsTrigger>
          <TabsTrigger value="admin" className="w-full justify-start text-md">
            Dictionary Control Panel
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-[2] flex flex-col p-4 bg-surface0 rounded-lg ">
        <TabsContent value="general" className="mt-0 flex flex-col gap-2">
          <GeneralTab auth={auth} />
        </TabsContent>
        <TabsContent value="account">
          <AccountTab auth={auth} />
        </TabsContent>
        <TabsContent value="admin">
          <DictJsonForm />
        </TabsContent>
      </div>
    </Tabs>
  );
};
