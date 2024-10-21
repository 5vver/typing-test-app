import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
} from '@components/Profile/types.ts';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { httpRequest } from '@utils/http-request.ts';

const changePasswordQuery = async ({
  password,
  newPassword,
}: ChangePasswordPayload) => {
  const { data, error } = await httpRequest<ChangePasswordResponse>(
    '/users/password/update',
    {
      method: 'PATCH',
      data: { password, newPassword },
      withCredentials: true,
    },
  );

  if (!data || error) {
    throw new Error(error?.message);
  }

  return data;
};

const useChangePasswordQuery = (): UseMutationResult<
  ChangePasswordResponse,
  unknown,
  ChangePasswordPayload,
  unknown
> =>
  useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (payload: ChangePasswordPayload) =>
      changePasswordQuery(payload),
  });

export { useChangePasswordQuery };
