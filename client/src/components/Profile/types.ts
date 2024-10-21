type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  success: boolean;
  message?: string;
};

export type { ChangePasswordPayload, ChangePasswordResponse };
