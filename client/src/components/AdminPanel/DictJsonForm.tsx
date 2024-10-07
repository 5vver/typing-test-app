import { useProcessDictQuery } from '@components/AdminPanel/queries.ts';
import { jsonSchema } from '@components/AdminPanel/schema.ts';
import { Button } from '@components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form.tsx';
import { Textarea } from '@components/ui/textarea.tsx';
import { type FC, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

const jsonFormSchema = z.object({ json: z.string() });

const jsonResolver: Resolver<z.infer<typeof jsonFormSchema>> = async (
  values,
) => {
  try {
    jsonSchema.parse({ payload: values.json });
    return { values, errors: {} };
  } catch (e) {
    return {
      values: {},
      errors: { json: { type: 'manual', message: (e as z.ZodError).message } },
    };
  }
};

const defaultJson = JSON.stringify({
  title: 'name',
  lang: 'en',
  words: ['insert', 'words', 'here'],
});

const DictJsonForm: FC = () => {
  const { mutate, isPending } = useProcessDictQuery();

  const [jsonValue, setJsonValue] = useState(defaultJson);

  const jsonForm = useForm<z.infer<typeof jsonFormSchema>>({
    resolver: jsonResolver,
  });

  const onSubmit = (data: z.infer<typeof jsonFormSchema>) => {
    mutate(JSON.parse(data.json));
    // console.log(JSON.parse(data.json));
  };

  return (
    <div className="flex flex-col gap-2">
      <Form {...jsonForm}>
        <form
          onSubmit={jsonForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={jsonForm.control}
            name="json"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw JSON</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter json"
                    className="resize-none"
                    {...field}
                    value={jsonValue}
                    onChange={(e) => {
                      setJsonValue(e.target.value);
                      field.onChange(e);
                    }}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between">
            <Button
              onClick={() => {
                setJsonValue(defaultJson);
                jsonForm.reset();
              }}
              variant="outline"
              type="reset"
            >
              Clear
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { DictJsonForm };
