import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { type FormEvent, useLayoutEffect, useState } from "react";
import { z } from "zod";

const fallback = "/" as const;

export const Route = createFileRoute("/login")({
  component: LoginComponent,
  validateSearch: z.object({ redirect: z.string().optional().catch("") }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.status === "loggedIn") {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});

function LoginComponent() {
  const { auth, status } = Route.useRouteContext({
    select: ({ auth }) => ({ auth, status: auth.status }),
  });

  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useLayoutEffect(() => {
    if (status === "loggedIn" && search.redirect) {
      router.history.push(search.redirect);
    }
  }, [router, status, search.redirect]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username || !password) return;

    try {
      auth.login(username, password);
      router.invalidate();

      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 grid gap-2 place-items-center">
      <div>You must log in!</div>
      <div className="h-2" />
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-1 px-2 rounded"
          disabled={isLoading}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-1 px-2 rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
