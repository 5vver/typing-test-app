import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/utils/auth.tsx";
import { createRouter, TanStackRouterDevtools } from "./utils/router.tsx";

const router = createRouter();

const InnerApp = () => {
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

const App = () => (
  <AuthProvider>
    <InnerApp />
  </AuthProvider>
);

export default App;
