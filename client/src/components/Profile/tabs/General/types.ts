import type { ToastEmitter } from '@hooks/use-toast.ts';
import { Auth } from '@utils/auth.tsx';
import { type RefObject } from 'react';

type NicknameChangePayload = {
  nickname: string;
};

type ChangeNicknameMutationProps = {
  toastEmitter?: ToastEmitter;
  refetch?: Auth['refetch'];
};

type UploadAvatarMutationProps = {
  refetch?: Auth['refetch'];
  inputRef?: RefObject<HTMLInputElement>;
};

export type {
  ChangeNicknameMutationProps,
  NicknameChangePayload,
  UploadAvatarMutationProps,
};
