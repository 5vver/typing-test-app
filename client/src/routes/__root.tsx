import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Auth } from "@/utils/auth.tsx";
import { Layout } from "@/components/layout";

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
