import { DictData, SelectDictWords, WordData } from '@/types/test-types.ts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@utils/http-request.ts';

const getRandomWords = async (selectWordOptions: SelectDictWords) => {
  const { data, error } = await httpRequest<WordData[]>(
    '/tests/getRandomWords',
    {
      data: selectWordOptions,
      method: 'POST',
    },
  );

  if (error) throw error;
  if (!data) return null;

  return data;
};

const useGetRandomWords = (
  options: SelectDictWords,
  enabled: boolean = true,
): UseQueryResult<WordData[]> => {
  return useQuery({
    queryKey: ['randomWords', options],
    queryFn: () => getRandomWords(options),
    refetchOnWindowFocus: false,
    enabled,
  });
};

const getDictsQuery = async () => {
  const { data, error } = await httpRequest<DictData[]>('/tests/getDicts');

  if (error) throw error;
  if (!data) return null;

  return data;
};

const useGetDicts = (): UseQueryResult<DictData[]> => {
  return useQuery({
    queryKey: ['dictsData'],
    queryFn: getDictsQuery,
    refetchOnWindowFocus: false,
  });
};

export { getRandomWords, useGetDicts, useGetRandomWords };
