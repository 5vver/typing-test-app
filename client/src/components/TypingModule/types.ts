export type Word = {
  value: string;
  status: 'active' | 'finished' | 'failed' | 'pending';
};