import {
  registerFormSchema,
  type RegisterFormValues,
} from '@components/RegisterForm/form-schema.ts';
import { Spinner } from '@components/Spinner.tsx';
import { Button } from '@components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form.tsx';
import { Input } from '@components/ui/input.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: (values: RegisterFormValues) => void;
  isLoading?: boolean;
};

const RegisterForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
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
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="password"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
          name="email"
        />

        <div className="flex justify-end">
          <Button type="submit">
            {isLoading ? <Spinner size="sm" /> : <>Register</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { RegisterForm };
