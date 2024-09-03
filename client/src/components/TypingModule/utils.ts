import type {
  ChartData,
  GenerateWords,
  Stats,
  Status,
  Word,
} from '@components/TypingModule/types.ts';
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const formWord = (
  word: string,
  index: number,
  firstActive = true,
): Word => {
  if (firstActive && index === 0) return { value: word, status: 'active' };
  return { value: word, status: 'pending' };
};

export const formWords = (words: string[]): Word[] => {
  return words.map((word, index) => formWord(word, index));
};

const WORD_GAP = 16; // 16px

const getWordWidth = (wordElement: Element): number => {
  const width = wordElement.clientWidth;
  return width + WORD_GAP;
};

export const sliceWordList = (
  setWordList: Dispatch<SetStateAction<Word[]>>,
  wordListContainer: HTMLDivElement,
  generateWordsFn?: GenerateWords['generateWords'],
) => {
  const fulfilledWordNodes = ['#word_finished', '#word_failed'].map((id) =>
    wordListContainer.querySelectorAll(id),
  );

  const fulfilledWordElements = [
    ...(fulfilledWordNodes[0] ? fulfilledWordNodes[0].values() : []),
    ...(fulfilledWordNodes[1] ? fulfilledWordNodes[1].values() : []),
  ];
  const activeWordElement = wordListContainer.querySelector('#word_active');

  const activeWordWidth = activeWordElement
    ? getWordWidth(activeWordElement)
    : 0;
  const containerWidth = wordListContainer.offsetWidth;
  let currentRowWidth = 0;
  let lastIndex = 0;

  for (let i = 0; i < fulfilledWordElements.length; i++) {
    const wordElement = fulfilledWordElements.at(i);
    if (!wordElement) continue;

    const isLast = i === fulfilledWordElements.length - 1;
    const wordWidth = isLast
      ? getWordWidth(wordElement) - WORD_GAP
      : getWordWidth(wordElement);
    const aWordWidth = isLast ? activeWordWidth : 0;
    if (currentRowWidth + wordWidth + aWordWidth > containerWidth * 2) {
      lastIndex = i;
      break;
    }
    currentRowWidth += wordWidth;
  }

  if (!lastIndex) return;
  setWordList((prev) => {
    const newWordList = prev.slice(lastIndex + 1);
    if (generateWordsFn) {
      const newWords = generateWordsFn({
        count: lastIndex + 1,
        firstActive: false,
      });
      if (newWords.length > 0) newWordList.push(...newWords);
    }
    return newWordList;
  });
};

export const getLetterStyle = (
  letter: string,
  letterIndex: number,
  inputValue: string,
  wordValue: string,
  status: Word['status'],
  wordMistakes?: number[],
  missed?: number[],
  typed?: string,
) => {
  const isWordActive = status === 'active';
  const isWordFinished = status === 'finished' || status === 'failed';
  const isLetterTyped = isWordActive && letterIndex < inputValue.length;
  const isOverTyped = letterIndex >= wordValue.length;

  /* mistakes & over typed handle **/
  if (wordMistakes?.includes(letterIndex) || missed?.includes(letterIndex))
    return 'text-red-400';
  else if (isOverTyped) return 'text-red-300';
  else if (wordMistakes && wordMistakes.length > 0) return 'text-lavender';

  // emphasize active latter
  //if (isLetterActive && !inputValue[letterIndex]) return 'text-blue';

  /* wrong typed letter **/
  if (isLetterTyped && letter !== inputValue[letterIndex]) {
    return 'text-red-400';
  }
  /* correct typed/finished letter **/
  if (isLetterTyped && letter === inputValue[letterIndex])
    return 'text-lavender';
  else if (isWordFinished && letter === typed?.[letterIndex])
    return 'text-lavender';

  /* statuses handle **/
  if (status === 'finished') return 'text-lavender';
  if (status === 'failed') return 'text-red-400';
  if (status === 'pending') return 'text-subtext0';

  /* active pending letter **/
  return 'text-subtext0';
};

export const useAreaFocus = (
  isFocused: boolean,
  setStatus: Dispatch<SetStateAction<Status>>,
  areaRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
  wordList: Word[],
) => {
  const [isClicking, setIsClicking] = useState(false);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = areaRef.current;
    if (!container) return;

    const handleMouseDown = () => void setIsClicking(true);
    const handleMouseUp = () => void setIsClicking(false);

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [areaRef, setIsClicking]);

  /* when word list updates - clear focus timeout **/
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
    };
  }, [wordList]);

  const onFocus = useCallback(() => {
    const input = inputRef.current;
    if (!input) throw new Error('Input element not found');

    input.focus();

    if (isFocused) return;
    setStatus((prev) => ({ ...prev, isFocused: true }));
  }, [isFocused, inputRef, setStatus]);

  const onBlur = useCallback(() => {
    if (isClicking) return;

    focusTimeoutRef.current = setTimeout(() => {
      setStatus((prev) => ({ ...prev, isFocused: false }));
    }, 500);
  }, [isClicking, setStatus, focusTimeoutRef]);

  return { onFocus, onBlur };
};

/*
 * Calculate gross words per minute
 * @param totalTyped - number of total typed words
 * @param time - time in seconds
 * @returns gross words per minute
 */
export const calcGrossWpm = (totalTyped: number, time: number) => {
  const timeSeconds = time <= 0 ? 1 : time;
  const grossWpm = totalTyped / 5 / (timeSeconds / 60);
  return grossWpm > 0 ? Math.round(grossWpm) : 0;
};

/*
 * Calculate net words per minute
 * @param totalTyped - number of total typed words
 * @param incorrectTyped - number of incorrect typed words
 * @param time - time in seconds
 * @returns net words per minute
 */
export const calcNetWpm = (
  totalTyped: number,
  incorrectTyped: number,
  time: number,
) => {
  const timeSeconds = time <= 0 ? 1 : time;
  const netWpm = (totalTyped / 5 - incorrectTyped) / (timeSeconds / 60);
  return netWpm > 0 ? Math.round(netWpm) : 0;
};

/*
 * Calculate accuracy
 * @param totalTyped - total typed words
 * @param correctTyped - number of correct typed words
 * @returns accuracy in percentage
 */
export const calcAccuracy = (totalTyped: number, correctTyped: number) => {
  const acc = (correctTyped / totalTyped) * 100;
  if (!acc) return 0;
  return parseFloat(acc.toFixed(2));
};

type TimerCountdownProps = {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
  stats: Stats;
  setStats: Dispatch<SetStateAction<Stats>>;
  setResultChart: Dispatch<SetStateAction<ChartData[]>>;
  initialTimerCount?: number;
};
export const useTimerCountdown = ({
  status,
  setStatus,
  stats,
  setStats,
  setResultChart,
  initialTimerCount = 60,
}: TimerCountdownProps) => {
  const { isFinished, isFocused, isTyping } = status;

  const [timerCount, setTimerCount] = useState(initialTimerCount);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevTimerRef = useRef(timerCount);
  const prevStatsRef = useRef(stats);
  const prevMistakesRef = useRef<number>(0);

  const updateChartResult = useCallback(
    (timeElapsed: number) => {
      const prevStats = prevStatsRef.current;
      const prevMistakes = prevMistakesRef.current;

      const diff = prevStats.incorrectChars - prevMistakes;
      const isMistake = diff > 0;
      if (isMistake) prevMistakesRef.current += diff;

      const rawWpm = calcGrossWpm(prevStats.totalChars, timeElapsed);
      const netWpm = calcNetWpm(
        prevStats.totalChars,
        prevStats.incorrectChars,
        timeElapsed,
      );

      setResultChart((prev) => [
        ...prev,
        {
          timestamp: timeElapsed,
          rawWpm,
          netWpm,
          ...(isMistake ? { mistake: rawWpm, mistakeRate: diff } : {}),
        },
      ]);
    },
    [setResultChart],
  );

  useEffect(() => {
    const timer = timerIntervalRef.current;

    if (isFinished || !isFocused || !isTyping) {
      if (timer) {
        clearInterval(timer);
        timerIntervalRef.current = null;
      }
      return;
    }
    /* on timer finish **/
    if (timerCount <= 0) {
      setStatus((prev) => ({ ...prev, isFinished: true }));
      setStats((prev) => ({
        ...prev,
        wpm: calcNetWpm(
          prev.totalChars,
          prev.incorrectChars,
          initialTimerCount,
        ),
        accuracy: calcAccuracy(prev.totalChars, prev.correctChars),
      }));
      updateChartResult(initialTimerCount);
    }

    if (!timer)
      timerIntervalRef.current = setInterval(() => {
        const prevTimerCount = prevTimerRef.current;
        const timeElapsed = initialTimerCount - prevTimerCount;

        setTimerCount((prev) => prev - 1);
        updateChartResult(timeElapsed);
      }, 1000);

    prevTimerRef.current = timerCount;
    prevStatsRef.current = stats;
  }, [
    isFinished,
    isFocused,
    isTyping,
    timerCount,
    setStatus,
    setTimerCount,
    stats,
    setStats,
    setResultChart,
    initialTimerCount,
    updateChartResult,
  ]);

  const resetTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    prevTimerRef.current = initialTimerCount;
    prevStatsRef.current = stats;
    prevMistakesRef.current = 0;

    setTimerCount(initialTimerCount);
  }, [initialTimerCount, setTimerCount, stats]);

  return { timerCount, setTimerCount, resetTimer };
};
