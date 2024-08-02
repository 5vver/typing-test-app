import { type FC, useCallback } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog.tsx";
import { LoginForm } from "@components/LoginForm";
import { LoginFormValues } from "@components/LoginForm/form-schema.ts";
import { useAuth } from "@utils/auth.tsx";

export const LoginDialog: FC = () => {
  const { login } = useAuth();
  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      const { username, password } = values;

      if (!username || !password) return;

      try {
        const loggedIn = await login(username, password);
        if (!loggedIn) return;
      } catch (error) {
        console.error(error);
      }
    },
    [login],
  );

  return (
    <DialogContent className="w-full xs:w-1/2 lg:w-1/3">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <div className="p-4">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </DialogContent>
  );
};
