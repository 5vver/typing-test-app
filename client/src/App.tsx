import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/utils/auth.tsx";
import { createRouter, TanStackRouterDevtools } from "./utils/router.tsx";
import { type FC } from "react";
import { ThemeProvider } from "@components/theme-provider.tsx";

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
