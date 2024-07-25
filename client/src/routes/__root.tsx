import { FC } from "react";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Auth } from "@/utils/auth.ts";
import { Layout } from "@/components/layout";

const RootComponent: FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
});
