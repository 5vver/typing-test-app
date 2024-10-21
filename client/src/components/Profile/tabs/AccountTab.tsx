import { useChangePasswordQuery } from '@components/Profile/queries.ts';
import {
  passwordChangeSchema,
  PasswordChangeValues,
} from '@components/Profile/tabs/form-schema.ts';
import { Spinner } from '@components/Spinner.tsx';
import { Typography } from '@components/Typography.tsx';
import { Button } from '@components/ui/button.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form.tsx';
import { Input } from '@components/ui/input.tsx';
import { Separator } from '@components/ui/separator.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Auth } from '@utils/auth.tsx';
import { type FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  auth: Auth;
};

const AccountTab: FC<Props> = ({ auth }) => {
  const { profile: { email } = {} } = auth;

  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const passwordForm = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const {
    mutate: changePassword,
    isPending: isPasswordPending,
    data: changePasswordData,
    reset: resetChangePassword,
  } = useChangePasswordQuery();

  const onPasswordChangeSubmit = useCallback(() => {
    const { oldPassword, newPassword } = passwordForm.getValues();

    changePassword({ password: oldPassword, newPassword });
  }, [changePassword, passwordForm]);

  const onPasswordChangeClose = useCallback(() => {
    setIsPasswordChanging(false);
    resetChangePassword();
    passwordForm.reset();
  }, [resetChangePassword, passwordForm, setIsPasswordChanging]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Typography size="muted">Email address</Typography>
        <Separator orientation="horizontal" className="bg-surface1" />
        <Typography size="small">{email}</Typography>
      </div>

      <div className="flex flex-col gap-1.5">
        <Typography size="muted">Password</Typography>
        <Separator orientation="horizontal" className="bg-surface1" />
        <Collapsible
          open={isPasswordChanging}
          onOpenChange={setIsPasswordChanging}
          className="w-[350px]"
        >
          <CollapsibleTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className={`font-normal ${isPasswordChanging ? 'hidden' : ''}`}
            >
              Change password
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordChangeSubmit)}
                className="flex flex-col gap-y-2"
              >
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Old password"
                          autoComplete="old password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="oldPassword"
                />

                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="newPassword"
                />

                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          autoComplete="new password confirm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="newPasswordConfirm"
                />

                {changePasswordData?.message && (
                  <Typography
                    size="small"
                    className={
                      changePasswordData.success
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {changePasswordData.message}
                  </Typography>
                )}

                <div className="flex gap-4 items-center">
                  <Button type="submit">
                    {isPasswordPending ? <Spinner size="sm" /> : <>Change</>}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onPasswordChangeClose}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export { AccountTab };
