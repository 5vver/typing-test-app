export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
  nickname?: string;
  avatar?: string;
};

export type UserStats = {
  id: string;
  /** Test title */
  name: string;
  wpm: number;
  wpmRaw: number;
  accuracy: number;
  correctWords: number;
  incorrectWords: number;
  totalWords: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  totalChars: number;
  timestamp: number;
};

export type UserResultPayload = {
  stats: Omit<UserStats, 'id' | 'name' | 'timestamp'>;
  testId: string;
};

export type UserResultFilter = {
  name?: string;
  dateFrom?: string;
  dateTo?: string;
  wpmFrom?: number;
  wpmTo?: number;
  order?: 'ASC' | 'DESC';
};
