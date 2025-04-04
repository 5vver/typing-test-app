type GenericResponse<T = unknown> = {
  success: boolean;
  data?: T;
  statusCode?: number;
  message?: string;
};

export type { GenericResponse };
