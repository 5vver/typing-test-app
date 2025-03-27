import { Stats } from '@/components/TypingModule/types';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile, UserResultPayload } from '@/types/user-types.ts';
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

const saveResults = async (payload: UserResultPayload) => {
  const { stats, testId } = payload;

  const { data, error } = await httpRequest<Stats>('/users/result/save', {
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

export { getUserProfile, useGetUserProfile, useSaveResults };
