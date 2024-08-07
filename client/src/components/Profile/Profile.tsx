import { type FC } from "react";
import { type Auth } from "@utils/auth.tsx";

type Props = {
  auth: Auth;
};

export const Profile: FC<Props> = ({ auth }) => {
  const { username, role } = auth;

  return <div>profile</div>;
};
