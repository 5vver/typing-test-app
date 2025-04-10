import { Alert } from '@/components/Alert';
import { Layout } from '@/components/layout';
import { type Auth } from '@/utils/auth.tsx';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <Alert
        title="Not found"
        description="The feature is under construction."
      />
    );
  },
});

function RootComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
