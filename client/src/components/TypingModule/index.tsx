import type { SelectWordOptions } from '@/types/test-types.ts';
import { Icon } from '@components/Icon';
import { Spinner } from '@components/Spinner.tsx';
import { wordsDictAtom } from '@components/TypingModule/generate-words.ts';
import { statsAtom, statusAtom } from '@components/TypingModule/store.ts';
import { TypingCore } from '@components/TypingModule/TypingCore.tsx';
import { Typography } from '@components/Typography.tsx';
import { Button } from '@components/ui/button.tsx';
import { Skeleton } from '@components/ui/skeleton.tsx';
import { useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom } from 'jotai';
import { type FC, useCallback, useEffect, useState } from 'react';

const TypingModule: FC = () => {
  const [wordOptions, setWordOptions] = useState<SelectWordOptions>({
    count: 50,
  });
  const [timerCount, setTimerCount] = useState(0);

  const { data, isLoading, isError, refetch, isRefetching } =
    useGetRandomWords(wordOptions);

  const [wordsDict, setWordsDict] = useAtom(wordsDictAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [{ isFocused, isFinished, isTyping }, setStatus] = useAtom(statusAtom);

  useEffect(() => {
    if (!data) return;
    setWordsDict(data);
  }, [setWordsDict, data, isRefetching]);

  useEffect(() => {
    if (isFinished || !isFocused || !isTyping) return;
    if (timerCount >= 60)
      return void setStatus((prev) => ({ ...prev, isFinished: true }));

    const timer = setInterval(() => {
      setTimerCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, isFocused, isTyping, timerCount, setStatus, setTimerCount]);

  const onReload = useCallback(async () => {
    setStats({ wpm: 0, accuracy: 0, correct: 0, incorrect: 0, total: 0 });
    setTimerCount(0);
    setStatus({
      isTyping: false,
      isFinished: false,
      isFailed: false,
      isFocused: true,
    });
    await refetch();
  }, [setStats, setTimerCount, setStatus, refetch]);

  const isReloading = isLoading || isRefetching;
  const isTypingCoreVisible =
    wordsDict.length > 0 && !isReloading && !isFinished;

  if (!data || isError) return null;

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div className="px-24 pt-16 w-full">
        {isTypingCoreVisible && (
          <>
            <div className="flex justify-end w-full">
              <Typography className="text-lavender">{timerCount}</Typography>
            </div>
            <TypingCore />
          </>
        )}
        {isReloading && (
          <div className="flex flex-col gap-[16px] justify-center h-[144px]">
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
          </div>
        )}
        {isFinished && (
          <div className="flex flex-col gap-4 bg-surface0 p-4 rounded-md">
            <Typography size="h4" className="text-lavender">
              Results
            </Typography>
            <Typography>Correct: {stats.correct}</Typography>
            <Typography>Failed: {stats.incorrect}</Typography>
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
