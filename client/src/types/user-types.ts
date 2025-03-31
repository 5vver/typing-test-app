import { Stats } from '@/components/TypingModule/types';

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  nickname?: string;
  avatar?: string;
};

export type UserResultPayload = {
  stats: Stats;
  testId: string;
};
