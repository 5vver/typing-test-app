import { type FC, useCallback } from "react";
import { Auth } from "@utils/auth.tsx";
import { Logo } from "@components/layout/header/Logo.tsx";
import { NavButtons } from "@components/layout/header/NavButtons.tsx";
import { AccountDropdown } from "@components/layout/header/Account/AccountDropdown.tsx";

type Props = {
  auth: Auth;
};

const Header: FC<Props> = ({ auth }) => {
  const { status, logout } = auth;

  const onLogout = useCallback(async () => {
    return await logout();
  }, [logout]);

  return (
    <div className="flex-row gap-x-1 h-14">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Navigation"
          className="flex items-center content-center justify-between p-6 lg:px-8"
        >
          <Logo />
          <NavButtons />
          <AccountDropdown status={status} onLogout={onLogout} />
        </nav>
      </header>
    </div>
  );
};

export { Header };
