import { useToast } from '@/hooks/use-toast';
import { BasicResponse } from '@/types';
import type {
  UserProfile,
  UserResultFilter,
  UserResultPayload,
  UserStats,
} from '@/types/user-types.ts';
import { httpRequest } from '@/utils/http-request.ts';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

const getUserProfile = async () => {
  const { data, error } = await httpRequest<UserProfile>('/users/profile', {
    withCredentials: true,
  });

  if (!data || error) {
    return null;
  }

  return data;
};

const useGetUserProfile = (): UseQueryResult<UserProfile> =>
  useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    staleTime: 0,
    gcTime: 0,
  });

const saveResults = async (payload: UserResultPayload) => {
  const { stats, testId } = payload;

  const { data, error } = await httpRequest<BasicResponse>(
    '/users/result/save',
    {
      method: 'POST',
      data: {
        wpm: stats.wpm,
        wpm_raw: stats.wpmRaw,
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
    },
  );

  if (!data?.success || error) {
    throw new Error(data?.message || 'UNKNOWN_ERROR');
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

const getUserResults = async (
  payload: PaginationState,
  filter?: UserResultFilter,
) => {
  const { data, error } = await httpRequest<
    BasicResponse<{ stats: UserStats[]; total: number }>
  >('/users/result/get', {
    method: 'POST',
    data: {
      ...payload,
      filter,
    },
    withCredentials: true,
  });

  if (!data?.success || error) {
    throw new Error(data?.message || 'UNKNOWN_ERROR');
  }

  return data.data;
};

const useGetUserResults = (
  pagination: PaginationState,
  filter?: UserResultFilter,
) =>
  useQuery({
    queryKey: ['getUserResults', pagination, filter],
    queryFn: () => getUserResults(pagination, filter),
    placeholderData: keepPreviousData,
  });

export { getUserProfile, useGetUserProfile, useGetUserResults, useSaveResults };
