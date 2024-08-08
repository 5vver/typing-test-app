import { Alert } from '@components/Alert.tsx';
import { RegisterForm } from '@components/RegisterForm';
import { type RegisterFormValues } from '@components/RegisterForm/form-schema.ts';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog.tsx';
import { useNavigate } from '@tanstack/react-router';
import { type Auth } from '@utils/auth.tsx';
import { isAxiosError } from 'axios';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

type Props = {
  register: Auth['register'];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RegisterDialog: FC<Props> = ({ register, setOpen }) => {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      const { username, password, email } = values;

      if (!username || !password) return;

      setIsLoading(true);
      try {
        const registered = await register(username, password, email);
        if (!registered) return;
        setOpen(false);
        await navigate({ to: '/login' });
      } catch (error) {
        if (isAxiosError(error)) setAlertMessage(error.response?.data.message);
        else if (error instanceof Error) setAlertMessage(error.message);
        else setAlertMessage('An error occurred during registration.');
        setAlertOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [register, setOpen, navigate, setAlertMessage, setAlertOpen, setIsLoading],
  );

  return (
    <>
      <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </DialogContent>

      <Alert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        setAlertMessage={setAlertMessage}
        title="Error while registration"
        message={alertMessage}
      />
    </>
  );
};

export { RegisterDialog };
