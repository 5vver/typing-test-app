import { type FC } from "react";
import { type Auth } from "@utils/auth.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar.tsx";
import { Typography } from "@components/Typography.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/tabs.tsx";
import { Separator } from "@components/ui/separator.tsx";

type Props = {
  auth: Auth;
};

export const Profile: FC<Props> = ({ auth }) => {
  const { username, role } = auth;

  const fallback = username
    ? username
        .split(" ")
        .map((s) => s[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex h-full gap-2"
    >
      <div className="flex-1 flex flex-col p-4 bg-surface0 rounded-lg">
        <Typography size="h3" className="mb-4 ml-4">
          Profile menu
        </Typography>

        <Separator orientation="horizontal" className="bg-surface1" />

        <TabsList className="flex flex-col flex-1 p-4 bg-surface0 rounded-lg justify-start">
          <TabsTrigger value="general" className="w-full justify-start text-md">
            General
          </TabsTrigger>
          <TabsTrigger value="personal" className="w-full justify-start text-md">
            Personal info
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-[2] flex flex-col p-4 bg-surface0 rounded-lg ">
        <TabsContent value="general" className="mt-0 flex flex-col gap-2">
          <div className="flex gap-2">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src="http://localhost:5000/public/a.jpg"
                alt="profile-pic-mini"
              />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            
            <div className='flex flex-col'>
              <Typography size="large">{username}</Typography>
              <Typography size='muted'>{role}</Typography>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="personal">personal</TabsContent>
      </div>
    </Tabs>
  );
};
