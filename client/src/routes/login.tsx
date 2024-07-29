import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { type FormEvent, useLayoutEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/utils/auth.tsx";

const fallback = "/" as const;

export const Route = createFileRoute("/login")({
  component: LoginComponent,
  validateSearch: z.object({ redirect: z.string().optional().catch("") }),
  beforeLoad: ({ context }) => {
    if (context.auth.status === "loggedIn") {
      throw redirect({ to: fallback });
    }
  },
});

function LoginComponent() {
  const { status, login } = useAuth();

  const router = useRouter();
  const navigate = Route.useNavigate();

  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useLayoutEffect(() => {
    if (status === "loggedIn") {
      router.history.push(fallback);
    }
  }, [router, status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) return;

    try {
      const loggedIn = await login(username, password);
      if (!loggedIn) return;
      router.invalidate();
      await navigate({ to: fallback });
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
