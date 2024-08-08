import { Alert } from '@components/Alert.tsx';
import { LoginForm } from '@components/LoginForm';
import { type LoginFormValues } from '@components/LoginForm/form-schema.ts';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog.tsx';
import { type Auth } from '@utils/auth.tsx';
import { isAxiosError } from 'axios';
import {
  Dispatch,
  type FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

type Props = {
  login: Auth['login'];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginDialog: FC<Props> = ({ login, setOpen }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const { username, password } = values;

      if (!username || !password) return;

      setIsLoading(true);
      try {
        const loggedIn = await login(username, password);
        if (!loggedIn) return;
        setOpen(false);
      } catch (error) {
        if (isAxiosError(error)) setAlertMessage(error.response?.data.message);
        else if (error instanceof Error) setAlertMessage(error.message);
        else setAlertMessage('An error occurred during login.');
        setAlertOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [login, setOpen, setIsLoading, setAlertOpen, setAlertMessage],
  );

  return (
    <>
      <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </DialogContent>

      <Alert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        setAlertMessage={setAlertMessage}
        title="Error while logging in"
        message={alertMessage}
      />
    </>
  );
};
