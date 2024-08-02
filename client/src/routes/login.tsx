import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { z } from "zod";
import { useAuth } from "@/utils/auth.tsx";
import { LoginForm } from "@components/LoginForm";
import { LoginFormValues } from "@components/LoginForm/form-schema.ts";

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

  useLayoutEffect(() => {
    if (status === "loggedIn") {
      router.history.push(fallback);
    }
  }, [router, status]);

  const onSubmit = async (values: LoginFormValues) => {
    const { username, password } = values;

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
    <div className="p-2 grid gap-2 place-items-center my-20 ">
      <span className='font-bold text-xl'>Login</span>
      <div className="w-72">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
