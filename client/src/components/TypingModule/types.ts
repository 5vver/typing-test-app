export type Word = {
  value: string;
  status: 'active' | 'finished' | 'failed' | 'pending';
  mistakes?: number[];
  typed?: string;
  overTyped?: string;
};