import { SelectWordOptions, WordData } from '@/types/test-types.ts';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@utils/http-request.ts';

export const getRandomWords = async (selectWordOptions: SelectWordOptions) => {
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

export const useGetRandomWords = (options: SelectWordOptions) => {
  return useQuery({
    queryKey: ['randomWords', options],
    queryFn: () => getRandomWords(options),
    refetchOnWindowFocus: false,
    //placeholderData: keepPreviousData,
  });
};
