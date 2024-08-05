import {
  Dispatch,
  type FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog.tsx";
import { LoginForm } from "@components/LoginForm";
import { type LoginFormValues } from "@components/LoginForm/form-schema.ts";
import { type Auth } from "@utils/auth.tsx";
import axios from "axios";
import { Alert } from "@components/Alert.tsx";

type Props = {
  login: Auth["login"];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginDialog: FC<Props> = ({ login, setOpen }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const { username, password } = values;

      if (!username || !password) return;

      try {
        const loggedIn = await login(username, password);
        if (!loggedIn) return;
        setOpen(false);
      } catch (error) {
        if (axios.isAxiosError(error))
          setAlertMessage(error.response?.data.message);
        else if (error instanceof Error) setAlertMessage(error.message);
        else setAlertMessage("An error occurred during login.");
        setAlertOpen(true);
      }
    },
    [login, setOpen],
  );

  return (
    <>
      <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <LoginForm onSubmit={onSubmit} />
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
