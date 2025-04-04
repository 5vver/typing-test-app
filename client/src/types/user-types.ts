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
  accuracy: number;
  correctWords: number;
  incorrectWords: number;
  totalWords: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  totalChars: number;
};

export type UserResultPayload = {
  stats: UserStats;
  testId: string;
};

export type GetUserResultsPayload = {
  page: number;
  pageSize: number;
};
