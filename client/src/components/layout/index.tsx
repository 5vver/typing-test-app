import { type FC, type ReactNode } from "react";
import { useAuth } from "@/utils/auth.tsx";
import { Link } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  const { status } = useAuth();

  return (
    <div className="bg-gray-900 flex-row gap-x-1 h-14">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center content-center justify-between p-6 lg:px-8"
        >
          <div className="flex">
            <div className="-m-1.5 p-1.5 text-white">logo</div>
          </div>

          <div className="flex lg:hidden text-white">appears on mobile</div>

          <div className="hidden lg:flex lg:gap-x-12">
            {[
              { label: "val1", value: "1" },
              { label: "val2", value: "2" },
              { label: "val3", value: "3" },
            ].map(({ label, value }) => (
              <div
                key={value}
                className="text-lg font-semibold text-center text-white"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="p-0.5 text-white">Status: {status}</div>

          <div className="flex gap-4 text-slate-300">
            {status === "loggedIn" && (
              <div>
                <Link to="/profile" preload="intent">
                  Profile
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
      <div className="relative isolate px-6 pt-14 lg:px-8">{children}</div>
    </div>
  );
};

export { Layout };
