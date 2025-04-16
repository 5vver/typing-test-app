import { DictJsonForm } from '@/components/AdminPanel/components/DictJsonForm';
import { AccountTab } from '@/components/Profile/tabs/AccountTab/AccountTab';
import { GeneralTab } from '@/components/Profile/tabs/GeneralTab';
import { Typography } from '@components/Typography.tsx';
import { Separator } from '@components/ui/separator.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui/tabs.tsx';
import { useNavigate } from '@tanstack/react-router';
import { type Auth } from '@utils/auth.tsx';
import { useCallback, useEffect, useState, type FC } from 'react';
import { RecordsTab } from './tabs/RecordsTab';
import { ProfileTabs } from './types';

type Props = {
  auth: Auth;
};

export const Profile: FC<Props> = ({ auth }) => {
  const role = auth.profile?.role;

  const [tab, setTab] = useState<ProfileTabs>('general');
  const navigate = useNavigate();

  const setTabValue = useCallback(
    (value: string) => {
      setTab(value as ProfileTabs);
      navigate({ search: (prev) => ({ ...prev, tab: value }) });
    },
    [setTab],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab');

    setTabValue(tabParam ?? 'general');
  }, []);

  const onTabValueChange = useCallback(
    (value: string) => {
      setTabValue(value);
    },
    [setTab],
  );

  return (
    <Tabs
      value={tab}
      onValueChange={onTabValueChange}
      activationMode="manual"
      orientation="vertical"
      className="flex h-full gap-2 flex-1"
    >
      <div className="flex-1 flex flex-col p-4 bg-surface0 rounded-lg">
        <Typography size="h3" className="mb-4 ml-4">
          Settings
        </Typography>

        <Separator orientation="horizontal" className="bg-surface1" />

        <TabsList className="flex flex-col flex-1 p-4 bg-surface0 rounded-lg justify-start">
          <TabsTrigger
            value="general"
            className="w-full justify-start text-md cursor-pointer"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="w-full justify-start text-md cursor-pointer"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="records"
            className="w-full justify-start text-md cursor-pointer"
          >
            Records
          </TabsTrigger>

          {role === 'admin' && (
            <>
              <Separator orientation="horizontal" className="bg-surface1" />
              <TabsTrigger
                value="admin"
                className="w-full justify-start text-md cursor-pointer"
              >
                Dictionary Control Panel
              </TabsTrigger>
            </>
          )}
        </TabsList>
      </div>

      <div className="flex-2 flex flex-col p-4 bg-surface0 rounded-lg w-full overflow-auto">
        <TabsContent value="general" className="mt-0 flex flex-col gap-2">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="account">
          <AccountTab auth={auth} />
        </TabsContent>
        <TabsContent value="records">
          <RecordsTab />
        </TabsContent>
        <TabsContent value="admin">
          <DictJsonForm />
        </TabsContent>
      </div>
    </Tabs>
  );
};
