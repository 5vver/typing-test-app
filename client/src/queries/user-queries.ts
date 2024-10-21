import type { UserProfile } from '@/types/user-types.ts';
import { httpRequest } from '@/utils/http-request.ts';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { Auth } from '@utils/auth.tsx';

const getUserProfile = async () => {
  const { data, error } = await httpRequest<UserProfile>('/users/profile', {
    withCredentials: true,
  });

  if (!data || error) {
    return null;
  }

  return data;
};

const useGetUserProfile = (
  status: Auth['status'],
): UseQueryResult<UserProfile> =>
  useQuery({
    queryKey: ['user-profile', status],
    queryFn: getUserProfile,
    staleTime: 0,
    gcTime: 0,
  });

export { getUserProfile, useGetUserProfile };
