import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog.tsx";
import { type Auth } from "@utils/auth.tsx";
import { RegisterForm } from "@components/RegisterForm";
import { type RegisterFormValues } from "@components/RegisterForm/form-schema.ts";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { Alert } from "@components/Alert.tsx";

type Props = {
  register: Auth["register"];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RegisterDialog: FC<Props> = ({ register, setOpen }) => {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      const { username, password, email } = values;

      if (!username || !password) return;

      try {
        const registered = await register(username, password, email);
        if (!registered) return;
        setOpen(false);
        await navigate({ to: "/login" });
      } catch (error) {
        if (axios.isAxiosError(error))
          setAlertMessage(error.response?.data.message);
        else if (error instanceof Error) setAlertMessage(error.message);
        else setAlertMessage("An error occurred during registration.");
        setAlertOpen(true);
      }
    },
    [register, setOpen, navigate, setAlertMessage, setAlertOpen],
  );

  return (
    <>
      <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <RegisterForm onSubmit={onSubmit} />
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
