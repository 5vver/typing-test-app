import type {
  ChangeNicknameMutationProps,
  NicknameChangePayload,
  UploadAvatarMutationProps,
} from '@/components/Profile/tabs/GeneralTab/types';
import type { BasicResponse } from '@/types';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { httpRequest } from '@utils/http-request.ts';

const changeNicknameQuery = async ({ nickname }: NicknameChangePayload) => {
  const { data, error } = await httpRequest<BasicResponse>(
    'users/nickname/update',
    {
      method: 'PATCH',
      data: { nickname },
      withCredentials: true,
    },
  );

  if (!data?.success || error) {
    throw error;
  }

  return data;
};

const useChangeNicknameMutation = ({
  toastEmitter,
  refetch,
}: ChangeNicknameMutationProps): UseMutationResult<
  BasicResponse,
  unknown,
  NicknameChangePayload,
  unknown
> =>
  useMutation({
    mutationKey: ['changeNickname'],
    mutationFn: (payload: NicknameChangePayload) =>
      changeNicknameQuery(payload),
    onSuccess: () => {
      toastEmitter?.({ description: 'Nickname changed successfully' });
      refetch?.();
    },
    onError: (error) => {
      toastEmitter?.({
        title: 'Error occurred!',
        description: error instanceof Error ? error.message : 'unknown error',
        variant: 'destructive',
      });
    },
  });

const uploadAvatarQuery = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data, error } = await httpRequest<BasicResponse>(
    'users/avatar/upload',
    {
      method: 'POST',
      data: formData,
      withCredentials: true,
      timeout: 7500,
    },
  );

  if (!data?.success || error) {
    throw new Error(
      data?.message || error?.message || 'An unknown error occurred',
    );
  }

  return data;
};

const useUploadAvatarMutation = ({
  refetch,
  inputRef,
}: UploadAvatarMutationProps) =>
  useMutation({
    mutationKey: ['uploadAvatar'],
    mutationFn: uploadAvatarQuery,
    onSuccess: () => {
      refetch?.();
      const input = inputRef?.current;
      if (input) {
        input.value = '';
      }
    },
    onError: () => {
      const input = inputRef?.current;
      if (input) {
        input.value = '';
      }
    },
  });

export { useChangeNicknameMutation, useUploadAvatarMutation };
