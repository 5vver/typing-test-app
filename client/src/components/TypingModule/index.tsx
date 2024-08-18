import type { SelectWordOptions } from '@/types/test-types.ts';
import { Icon } from '@components/Icon';
import { Spinner } from '@components/Spinner.tsx';
import { wordsDictAtom } from '@components/TypingModule/generate-words.ts';
import { TypingCore } from '@components/TypingModule/TypingCore.tsx';
import { Button } from '@components/ui/button.tsx';
import { Skeleton } from '@components/ui/skeleton.tsx';
import { useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom } from 'jotai';
import { type FC, useCallback, useEffect, useState } from 'react';

const TypingModule: FC = () => {
  const [wordOptions, setWordOptions] = useState<SelectWordOptions>({
    count: 50,
  });
  const { data, isLoading, isError, refetch, isRefetching } =
    useGetRandomWords(wordOptions);

  const [wordsDict, setWordsDict] = useAtom(wordsDictAtom);

  useEffect(() => {
    if (!data) return;
    setWordsDict(data);
  }, [setWordsDict, data, isRefetching]);

  const onReload = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const isReloading = isLoading || isRefetching;
  const isTypingCoreVisible = wordsDict.length > 0 && !isReloading;

  if (!data || isError) return null;

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div className="px-24 pt-16 w-full">
        {isTypingCoreVisible ? (
          <TypingCore />
        ) : (
          <div className="flex flex-col gap-[16px] justify-center h-[144px]">
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
          </div>
        )}
      </div>
      <Button
        onClick={onReload}
        disabled={isReloading}
        variant="outline"
        className="w-[48px] h-[48px]"
      >
        {isReloading ? (
          <Spinner size="xs" />
        ) : (
          <Icon name="arrow-path" size={24} />
        )}
      </Button>
    </div>
  );
};

export { TypingModule };
