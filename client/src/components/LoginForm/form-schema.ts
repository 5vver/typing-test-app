import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character.' }),
  password: z
    .string()
    .min(1, { message: 'Password must be at least 1 character.' }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
