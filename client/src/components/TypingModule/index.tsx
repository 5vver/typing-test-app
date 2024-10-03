import { Icon } from '@components/Icon';
import { Spinner } from '@components/Spinner.tsx';
import { Results } from '@components/TypingModule/components/Results.tsx';
import { TypingCore } from '@components/TypingModule/components/TypingCore.tsx';
import { TypingCoreSkeleton } from '@components/TypingModule/components/TypingCoreSkeleton.tsx';
import { TypingToolbar } from '@components/TypingModule/components/TypingToolbar';
import {
  useGenerateWords,
  wordsDictAtom,
} from '@components/TypingModule/generate-words.ts';
import {
  blankStats,
  blankStatus,
  resultChartAtom,
  settingsAtom,
  statsAtom,
  statusAtom,
} from '@components/TypingModule/store.ts';
import type { Word } from '@components/TypingModule/types.ts';
import { useTimerCountdown } from '@components/TypingModule/utils.ts';
import { Button } from '@components/ui/button.tsx';
import { useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';

const TypingModule: FC = () => {
  const settings = useAtomValue(settingsAtom);

  const { data, isLoading, isError, refetch, isRefetching } = useGetRandomWords(
    { count: settings.words, lang: settings.dictionary },
  );

  const [wordsDict, setWordsDict] = useAtom(wordsDictAtom);
  const [stats, setStats] = useAtom(statsAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const setResultChart = useSetAtom(resultChartAtom);

  const { timerCount, resetTimer } = useTimerCountdown({
    status,
    setStatus,
    stats,
    setStats,
    setResultChart,
    initialTimerCount: settings.timerCount,
  });

  const { generateWords } = useGenerateWords();
  const [generatedWords, setGeneratedWords] = useState<Word[]>([]);

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

  const onReload = useCallback(async () => {
    setStats(blankStats);
    setStatus(blankStatus);
    setResultChart([]);

    resetTimer();

    if (reloadButtonRef.current) reloadButtonRef.current.blur();

    if (wordsDict.length) setGeneratedWords(generateWords());
    else await refetch();
  }, [
    setStats,
    setStatus,
    setGeneratedWords,
    generateWords,
    wordsDict,
    refetch,
    setResultChart,
    resetTimer,
  ]);

  const isReloading = isLoading || isRefetching;
  const isTypingCoreVisible =
    generatedWords.length > 0 && !isReloading && !status.isFinished;

  if (!data || isError) return null;

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div className="px-24 pt-32 w-full flex flex-col gap-4">
        <TypingToolbar
          timerCount={timerCount}
          onSettingsApply={() => {
            void onReload();
          }}
        />

        {isTypingCoreVisible && <TypingCore words={generatedWords} />}
        {isReloading && <TypingCoreSkeleton />}
        {status.isFinished && <Results stats={stats} />}
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
