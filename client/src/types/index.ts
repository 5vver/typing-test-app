type LabelValue<T = string | number> = {
  label: string;
  value: T;
};

type BasicResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
  status?: number;
};

export type { BasicResponse, LabelValue };
