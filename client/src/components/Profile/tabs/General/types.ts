import type { ToastEmitter } from '@hooks/use-toast.ts';
import { Auth } from '@utils/auth.tsx';

type NicknameChangePayload = {
  nickname: string;
};

type ChangeNicknameMutationProps = {
  toastEmitter?: ToastEmitter;
  refetch?: Auth['refetch'];
};

export type { ChangeNicknameMutationProps, NicknameChangePayload };
