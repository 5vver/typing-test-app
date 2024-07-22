import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status !== "loggedIn") {
      throw redirect({
        to: "/login",
        search: { redirectTo: location.pathname },
      });
    }

    return { username: context.auth.username };
  },
});
