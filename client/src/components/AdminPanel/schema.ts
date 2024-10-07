import { z } from 'zod';

const jsonPayloadSchema = z.object({
  title: z.string(),
  lang: z.string(),
  words: z.array(z.string()),
});

const jsonSchema = z.object({
  payload: z.preprocess(
    (value) => JSON.parse(value as string),
    jsonPayloadSchema,
  ),
});

export { jsonSchema };
