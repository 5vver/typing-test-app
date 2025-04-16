type WordData = {
  id: string;
  word: string;
  lang: string;
};

type SelectDictWords = {
  dictId: string;
  lang?: string;
};

type DictData = {
  id: string;
  title: string;
  test_words: [{ id: string }];
};

export type { DictData, SelectDictWords, WordData };
