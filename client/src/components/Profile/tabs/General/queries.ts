import type { BasicResponse } from '@/types';
import type {
  ChangeNicknameMutationProps,
  NicknameChangePayload,
} from '@components/Profile/tabs/General/types.ts';
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

export { useChangeNicknameMutation };
