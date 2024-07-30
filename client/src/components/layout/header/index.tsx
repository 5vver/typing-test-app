import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import { Auth } from "@utils/auth.tsx";
import { Icon } from "@components/Icon/icon.tsx";
import { Logo } from "@components/layout/header/Logo.tsx";
import {NavButtons} from "@components/layout/header/NavButtons.tsx";

type Props = {
  auth: Auth;
};

const Header: FC<Props> = ({ auth }) => {
  const { status } = auth;

  return (
    <div className="flex-row gap-x-1 h-14">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Navigation"
          className="flex items-center content-center justify-between p-6 lg:px-8"
        >
          <Logo />

          <NavButtons />

          <div className="flex gap-4 text-slate-300">
            {status === "loggedIn" && (
              <div>
                <Link to="/profile" preload="intent">
                  <Icon name="user-circle-solid" size={36} color="rosewater" />
                </Link>
              </div>
            )}

            {status === "loggedOut" && (
              <div className="flex gap-4">
                <div>
                  <Link to="/register" preload="intent">
                    register
                  </Link>
                </div>
                <div>
                  <Link to="/login" preload="intent">
                    login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export { Header };
