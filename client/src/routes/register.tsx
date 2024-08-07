import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { redirect, useRouter, useRouterState } from "@tanstack/react-router";
import { type FormEvent, useLayoutEffect, useState } from "react";
import { useAuth } from "@/utils/auth.tsx";

const fallback = "/" as const;

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
  validateSearch: z.object({ redirect: z.string().optional().catch("") }),
  beforeLoad: ({ context }) => {
    if (context.auth.status === "loggedIn") {
      throw redirect({ to: fallback });
    }
  },
});

function RegisterComponent() {
  const { status, register } = useAuth();

  const router = useRouter();
  const navigate = Route.useNavigate();

  const isRouterLoading = useRouterState({ select: (s) => s.isLoading });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useLayoutEffect(() => {
    if (status === "loggedIn") {
      router.history.push(fallback);
    }
  }, [router, status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !email) return;
    let registered = false;

    try {
      registered = await register(username, password, email);

      await navigate({ to: "/login" });
    } catch (error) {
      console.error(error);
    } finally {
      if (registered) alert(`Registered successfully: ${username}`);
      else alert("Failed to register");
    }
  };

  return (
    <div className="p-2 grid gap-2 place-items-center">
      <div>Register</div>
      <div className="h-2" />
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-1 px-2 rounded"
          disabled={isRouterLoading}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-1 px-2 rounded"
          disabled={isRouterLoading}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-1 px-2 rounded"
          disabled={isRouterLoading}
        />
        <button
          type="submit"
          className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
