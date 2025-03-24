import { Stats } from '@/components/TypingModule/types';
import type { UserProfile } from '@/types/user-types.ts';
import { httpRequest } from '@/utils/http-request.ts';
import {
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

const saveResults = async (stats: Stats) => {
  const { data, error } = await httpRequest<Stats>('/users/saveResults', {
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
    },
    withCredentials: true,
  });

  if (!data || error) {
    return null;
  }

  return data;
};

const useSaveResults = (stats: Stats) =>
  useMutation({
    mutationKey: ['saveResults'],
    mutationFn: () => saveResults(stats),
  });

export { getUserProfile, useGetUserProfile, useSaveResults };
