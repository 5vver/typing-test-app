type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

type ProfileTabs = 'general' | 'account' | 'records' | 'admin';

export type { ChangePasswordPayload, ProfileTabs };
