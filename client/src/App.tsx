import { AuthProvider, useAuth } from '@/utils/auth.tsx';
import { ThemeProvider } from '@components/theme-provider.tsx';
import { RouterProvider } from '@tanstack/react-router';
import { type FC } from 'react';
import { createRouter, TanStackRouterDevtools } from './utils/router.tsx';

const router = createRouter();

const InnerApp: FC = () => {
  const auth = useAuth();

  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{ auth }}
      />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </>
  );
};

const App: FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
