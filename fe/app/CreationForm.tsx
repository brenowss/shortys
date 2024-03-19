'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import { Input } from './components/ui/input';

const formSchema = z.object({
  slug: z
    .string()
    .min(2, {
      message: 'Slug must be at least 3 characters long',
    })
    .max(20, {
      message: 'Slug must be at most 20 characters long',
    }),
  url: z.string().url({
    message: 'Please enter a valid URL',
  }),
});

export default function CreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: '',
      url: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.google.com.br" {...field} />
              </FormControl>
              <FormDescription>
                Enter the original URL that you want to shorten.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-awesome-url" {...field} maxLength={24} />
              </FormControl>
              <FormDescription className="break-words">
                Enter a custom slug for your URL. <br />
                It will look like: https://shortys.vercel.app/
                {form.getValues().slug}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create 🚀
        </Button>
      </form>
    </Form>
  );
}
