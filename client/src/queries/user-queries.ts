import { useToast } from '@/hooks/use-toast';
import { BasicResponse } from '@/types';
import type {
  GetUserResultsPayload,
  UserProfile,
  UserResultPayload,
  UserStats,
} from '@/types/user-types.ts';
import { httpRequest } from '@/utils/http-request.ts';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
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

const saveResults = async (payload: UserResultPayload) => {
  const { stats, testId } = payload;

  const { data, error } = await httpRequest<UserStats>('/users/result/save', {
    method: 'POST',
    data: {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      correct_words: stats.correctWords,
      incorrect_words: stats.incorrectWords,
      total_words: stats.totalWords,
      correct_characters: stats.correctChars,
      missed_characters: stats.missedChars,
      total_characters: stats.totalChars,
      testId,
    },
    withCredentials: true,
  });

  if (!data || error) {
    return null;
  }

  return data;
};

const useSaveResults = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ['saveResults'],
    mutationFn: (payload: UserResultPayload) => saveResults(payload),
    onSuccess: () => {
      toast({ description: 'Result saved successfully' });
    },
    onError: () => {
      toast({ description: 'Error occured while saving result' });
    },
  });
};

const getUserResults = async (payload: GetUserResultsPayload) => {
  const { data, error } = await httpRequest<
    BasicResponse<{ stats: UserStats[]; total: number }>
  >('/users/result/get', {
    method: 'POST',
    data: payload,
    withCredentials: true,
  });

  if (!data?.success || error) {
    throw new Error(data?.message || 'UNKNOWN_ERROR');
  }

  return { ...data.data, page: payload.page };
};

const useGetUserResults = (pageSize: number) =>
  useInfiniteQuery({
    queryKey: ['getUserResults', pageSize],
    queryFn: ({ pageParam }) => getUserResults({ page: pageParam, pageSize }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const total = lastPage.total;

      return total && total > lastPage.page * pageSize
        ? lastPage.page + 1
        : undefined;
    },
  });

export { getUserProfile, useGetUserProfile, useGetUserResults, useSaveResults };
