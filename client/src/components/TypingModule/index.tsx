import { Spinner } from '@components/Spinner.tsx';
import { wordsDictAtom } from '@components/TypingModule/generate-words.ts';
import { TypingCore } from '@components/TypingModule/TypingCore.tsx';
import { useGetRandomWords } from '@queries/test-queries.ts';
import { useAtom } from 'jotai';
import { type FC, useEffect } from 'react';

const TypingModule: FC = () => {
  //const [wordOptions, setWordOptions] = useState<SelectWordOptions>();
  const { data, isLoading, isError } = useGetRandomWords({
    count: 30,
  });
  const [wordsDict, setWordsDict] = useAtom(wordsDictAtom);

  useEffect(() => {
    if (!data) return;
    setWordsDict(data);
  }, [setWordsDict, data]);

  if (isLoading) return <Spinner />;
  if (!data || isError) return null;

  return <div>{wordsDict.length > 0 && <TypingCore />}</div>;
};

export { TypingModule };
