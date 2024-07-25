import { RouterProvider } from "@tanstack/react-router";
import { auth } from "@/utils/auth.ts";
import { createRouter, TanStackRouterDevtools } from "./utils/router.tsx";

const router = createRouter();

function App() {
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
}

export default App;
