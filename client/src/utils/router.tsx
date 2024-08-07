import {
  createRouter as createTanStackRouter,
  ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";
import { lazy } from "react";
import { Spinner } from "@components/Spinner.tsx";

export const createRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    context: { auth: undefined! },
    defaultPendingComponent: () => (
      <div className={`flex justify-center items-center p-2`}>
        <Spinner />
      </div>
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
