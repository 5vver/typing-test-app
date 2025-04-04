import { z } from 'zod';

const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
    newPasswordConfirm: z
      .string()
      .min(1, { message: 'New password confirm is required' }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'New password and confirm new password must match',
    path: ['newPasswordConfirm'],
  });

type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;

export { passwordChangeSchema, type PasswordChangeValues };
