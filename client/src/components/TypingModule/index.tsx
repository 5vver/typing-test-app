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
import { useGetDicts, useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom, useSetAtom } from 'jotai';
import { type FC, useCallback, useEffect, useState } from 'react';
import { FinishButtons } from './components/FinishButtons';

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

  const { timerCount, resetTimer } = useTimerCountdown(settings.timerCount);

  const { generateWords } = useGenerateWords();
  const [generatedWords, setGeneratedWords] = useState<Word[]>([]);

  /* on dicts data load - set initial settings dict **/
  useEffect(() => {
    if (!dictsData) {
      return;
    }

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

  const onSave = useCallback(() => {
    void onReload();
  }, [onReload]);

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

        <TypingCore words={generatedWords} isHidden={!isTypingCoreVisible} />
        <TypingCoreSkeleton isLoading={isReloading} />
        <Results stats={stats} isFinished={status.isFinished} />
      </div>

      <FinishButtons
        onReload={onReload}
        onSave={onSave}
        isLoading={isReloading}
      />
    </div>
  );
};

export { TypingModule };
