import { RouterProvider } from "@tanstack/react-router";
import { auth } from "@/utils/auth.ts";
import { createRouter } from "./utils/router.tsx";

const router = createRouter();

function App() {
  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{ auth }}
    />
  );
}

export default App;
