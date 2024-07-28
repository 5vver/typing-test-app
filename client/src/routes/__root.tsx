import { type FC } from "react";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Auth } from "@/utils/auth.tsx";
import { Layout } from "@/components/layout";

const RootComponent: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
});
