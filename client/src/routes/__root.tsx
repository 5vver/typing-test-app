import { FC } from "react";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Auth } from "@/utils/auth.ts";

const RootComponent: FC = () => (
  <div className="flex-col gap-2">
    <div className="h-8 w-full text-left">header</div>
    <hr />
    <div className="flex-col gap-4">
      <div>
        <Link to="/profile" preload="intent">
          Profile
        </Link>
      </div>
      <div>
        <Link to="/login" preload="intent">
          login
        </Link>
      </div>
    </div>

    <Outlet />
  </div>
);

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
});
