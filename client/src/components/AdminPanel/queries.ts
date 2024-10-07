import type { ProcessDict } from '@components/AdminPanel/types.ts';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { httpRequest } from '@utils/http-request.ts';

const processDictQuery = async (payload: ProcessDict) => {
  const { data, error } = await httpRequest<{ success: boolean }>(
    '/tests/processDict',
    {
      method: 'POST',
      data: payload,
    },
  );

  if (!data?.success || error) {
    throw error;
  }

  return data;
};

const useProcessDictQuery = (): UseMutationResult<
  { success: boolean },
  unknown,
  ProcessDict,
  unknown
> =>
  useMutation({
    mutationKey: ['processDict'],
    mutationFn: (payload: ProcessDict) => processDictQuery(payload),
  });

export { useProcessDictQuery };
