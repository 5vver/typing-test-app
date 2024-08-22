import type { SelectWordOptions } from '@/types/test-types.ts';
import { Icon } from '@components/Icon';
import { Spinner } from '@components/Spinner.tsx';
import {
  useGenerateWords,
  wordsDictAtom,
} from '@components/TypingModule/generate-words.ts';
import { Results } from '@components/TypingModule/Results.tsx';
import {
  blankStats,
  blankStatus,
  statsAtom,
  statusAtom,
} from '@components/TypingModule/store.ts';
import { Word } from '@components/TypingModule/types.ts';
import { TypingCore } from '@components/TypingModule/TypingCore.tsx';
import { calcAccuracy, calcNetWpm } from '@components/TypingModule/utils.ts';
import { Typography } from '@components/Typography.tsx';
import { Button } from '@components/ui/button.tsx';
import { Skeleton } from '@components/ui/skeleton.tsx';
import { useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom } from 'jotai';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';

const TIMER_COUNT = 30;

const TypingModule: FC = () => {
  const [wordOptions, setWordOptions] = useState<SelectWordOptions>({
    count: 50,
  });
  const { data, isLoading, isError, refetch, isRefetching } =
    useGetRandomWords(wordOptions);

  const [wordsDict, setWordsDict] = useAtom(wordsDictAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [{ isFocused, isFinished, isTyping }, setStatus] = useAtom(statusAtom);

  const { generateWords } = useGenerateWords();
  const [generatedWords, setGeneratedWords] = useState<Word[]>([]);

  const [timerCount, setTimerCount] = useState(TIMER_COUNT);

  const reloadButtonRef = useRef<HTMLButtonElement>(null);

  /* on dict data load **/
  useEffect(() => {
    if (!data) return;
    setWordsDict(data);
  }, [setWordsDict, data, isRefetching]);

  /* on words dict load - generate words **/
  useEffect(() => {
    if (!wordsDict.length) return;
    setGeneratedWords(generateWords());
  }, [wordsDict, setGeneratedWords, generateWords]);

  useEffect(() => {
    if (isFinished || !isFocused || !isTyping) return;
    /* on timer finish **/
    if (timerCount <= 0) {
      setStatus((prev) => ({ ...prev, isFinished: true }));
      setStats((prev) => ({
        ...prev,
        wpm: calcNetWpm(prev.totalChars, prev.incorrectChars, TIMER_COUNT),
        accuracy: calcAccuracy(prev.totalChars, prev.correctChars),
      }));
    }

    const timer = setInterval(() => {
      setTimerCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    isFinished,
    isFocused,
    isTyping,
    timerCount,
    setStatus,
    setTimerCount,
    setStats,
  ]);

  const onReload = useCallback(async () => {
    setStats(blankStats);
    setStatus(blankStatus);
    setTimerCount(TIMER_COUNT);

    if (reloadButtonRef.current) reloadButtonRef.current.blur();

    if (wordsDict.length) setGeneratedWords(generateWords());
    else await refetch();
  }, [
    setStats,
    setTimerCount,
    setStatus,
    setGeneratedWords,
    generateWords,
    wordsDict,
    refetch,
    reloadButtonRef,
  ]);

  const isReloading = isLoading || isRefetching;
  const isTypingCoreVisible =
    generatedWords.length > 0 && !isReloading && !isFinished;

  if (!data || isError) return null;

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div className="px-24 pt-16 w-full">
        {isTypingCoreVisible && (
          <>
            <div className="flex justify-center items-center gap-0.5 w-full">
              <Icon name="clock" size={20} strokeColor="lavender" />
              <Typography size="large" className="text-lavender w-[21px]">
                {timerCount}
              </Typography>
            </div>
            <TypingCore words={generatedWords} />
          </>
        )}
        {isReloading && (
          <div className="flex flex-col gap-[16px] justify-center h-[144px]">
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
            <Skeleton className="h-[16px]" />
          </div>
        )}
        {isFinished && <Results stats={stats} />}
      </div>
      <Button
        onClick={onReload}
        disabled={isReloading}
        variant="outline"
        className="w-[48px] h-[48px]"
        ref={reloadButtonRef}
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
