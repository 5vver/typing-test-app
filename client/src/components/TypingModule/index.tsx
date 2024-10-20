import { Icon } from '@components/Icon';
import { Spinner } from '@components/Spinner.tsx';
import { Results } from '@components/TypingModule/components/Results.tsx';
import { TypingCore } from '@components/TypingModule/components/TypingCore.tsx';
import { TypingCoreSkeleton } from '@components/TypingModule/components/TypingCoreSkeleton.tsx';
import { TypingToolbar } from '@components/TypingModule/components/TypingToolbar';
import { INITIAL_GENERATE_WORDS_LENGTH } from '@components/TypingModule/constants.ts';
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
import { useGetDicts, useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom, useSetAtom } from 'jotai';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';

const TypingModule: FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const { data, isLoading, isError, isRefetching } = useGetRandomWords(
    { dictId: settings.dictionary },
    !!settings.dictionary,
  );

  const { data: dictsData } = useGetDicts();

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

  /* on dicts data load - set initial settings dict **/
  useEffect(() => {
    if (!dictsData) return;

    setSettings((prev) => {
      if (prev.dictionary) {
        return prev;
      }

      return {
        ...prev,
        dictionary: dictsData.at(-1)?.id ?? '',
      };
    });
  }, [dictsData, setSettings]);

  /* on words data load **/
  useEffect(() => {
    if (!data) {
      return;
    }

    setWordsDict(data);
  }, [setWordsDict, data, isRefetching]);

  /* on words dict load - generate words **/
  useEffect(() => {
    if (!wordsDict.length) {
      return;
    }

    setGeneratedWords(generateWords({ length: INITIAL_GENERATE_WORDS_LENGTH }));
  }, [wordsDict, setGeneratedWords, generateWords]);

  const onReload = useCallback(async () => {
    setStats(blankStats);
    setStatus(blankStatus);
    setResultChart([]);

    resetTimer();

    if (reloadButtonRef.current) {
      reloadButtonRef.current.blur();
    }

    if (wordsDict.length) {
      setGeneratedWords(
        generateWords({ length: INITIAL_GENERATE_WORDS_LENGTH }),
      );
    }
  }, [
    setStats,
    setStatus,
    setGeneratedWords,
    generateWords,
    wordsDict,
    setResultChart,
    resetTimer,
  ]);

  const isReloading = isLoading || isRefetching;
  const isTypingCoreVisible =
    generatedWords.length > 0 && !isReloading && !status.isFinished;

  if (!data || isError) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center w-full h-full">
      <div className="px-24 pt-32 w-full flex flex-col gap-4">
        <TypingToolbar
          timerCount={timerCount}
          dicts={dictsData}
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
