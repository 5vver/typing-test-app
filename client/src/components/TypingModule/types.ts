import { SelectWordOptions } from '@/types/test-types.ts';

export type Word = {
  value: string;
  status: 'active' | 'finished' | 'failed' | 'pending';
  mistakes?: number[];
  typed?: string;
  overTyped?: string;
};

export type GenerateWords = {
  generateWords: (
    options?: SelectWordOptions & { firstActive?: boolean },
  ) => Word[];
  generateWord: () => Word | null;
};
