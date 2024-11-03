type LabelValue<T = string | number> = {
  label: string;
  value: T;
};

type BasicResponse = {
  success: boolean;
  message?: string;
};

export type { BasicResponse, LabelValue };
