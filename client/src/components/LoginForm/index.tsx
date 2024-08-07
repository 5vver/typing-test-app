import { type FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button.tsx";
import { Input } from "@components/ui/input.tsx";
import {
  loginFormSchema,
  LoginFormValues,
} from "@components/LoginForm/form-schema.ts";
import { Spinner } from "@components/Spinner.tsx";

type Props = {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
};

const LoginForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your username"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="username"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="password"
        />
        <div className="flex justify-end">
          <Button type="submit" className="">
            {isLoading ? <Spinner size="sm" /> : <>Log in</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { LoginForm };
