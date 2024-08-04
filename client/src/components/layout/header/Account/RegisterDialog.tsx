import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
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

type Props = {
  register: Auth["register"];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RegisterDialog: FC<Props> = ({ register, setOpen }) => {
  const navigate = useNavigate();

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
        console.error(error);
      }
    },
    [register],
  );

  return (
    <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
      <DialogHeader>
        <DialogTitle>Register</DialogTitle>
      </DialogHeader>
      <div className="p-4">
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </DialogContent>
  );
};

export { RegisterDialog };
