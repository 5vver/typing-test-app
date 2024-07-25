import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";
import { lazy } from "react";

export const createRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    context: { auth: undefined! },
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>loading..</div>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
