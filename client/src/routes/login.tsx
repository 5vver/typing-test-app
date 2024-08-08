import { useAuth } from '@/utils/auth.tsx';
import { Alert } from '@components/Alert.tsx';
import { LoginForm } from '@components/LoginForm';
import { type LoginFormValues } from '@components/LoginForm/form-schema.ts';
import { Spinner } from '@components/Spinner.tsx';
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useCallback, useLayoutEffect, useState } from 'react';
import { z } from 'zod';

const fallback = '/' as const;

export const Route = createFileRoute('/login')({
  component: LoginComponent,
  validateSearch: z.object({ redirect: z.string().optional().catch('') }),
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'loggedIn') {
      throw redirect({ to: fallback });
    }
  },
});

function LoginComponent() {
  const { status, login } = useAuth();

  const router = useRouter();
  const navigate = Route.useNavigate();

  const isRouterLoading = useRouterState({ select: (s) => s.isLoading });
  const [isLoading, setIsLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useLayoutEffect(() => {
    if (status === 'loggedIn') {
      router.history.push(fallback);
    }
  }, [router, status]);

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const { username, password } = values;

      if (!username || !password) return;

      setIsLoading(true);
      try {
        const loggedIn = await login(username, password);
        if (!loggedIn) return;
        router.invalidate();
        await navigate({ to: fallback });
      } catch (error) {
        if (isAxiosError(error)) setAlertMessage(error.response?.data.message);
        else if (error instanceof Error) setAlertMessage(error.message);
        else setAlertMessage('An error occurred during login.');
        setAlertOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, login, router, navigate, setAlertMessage, setAlertOpen],
  );

  // TODO: replace spinner with Loader
  if (isRouterLoading) return <Spinner />;

  return (
    <>
      <div className="p-2 grid gap-2 place-items-center my-20 ">
        <span className="font-bold text-xl">Login</span>
        <div className="w-72">
          <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>

      <Alert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        setAlertMessage={setAlertMessage}
        title="Error while logging in"
        message={alertMessage}
      />
    </>
  );
}
