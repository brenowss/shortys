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
import LinksService from './services/LinksService';
import generateRandomSlug from './utils/generateRandomSlug';
import toast from './utils/toast';
import { useState } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: '',
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const response = await LinksService.createLink(values);

      if (response.shortLinkId) {
        toast({
          text: 'Link created successfully',
          type: 'success',
          time: 3000,
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex justify-between items-center">
                <FormLabel>Slug</FormLabel>

                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    const randomSlug = generateRandomSlug(10);
                    form.setValue('slug', randomSlug);
                    form.trigger('slug');
                  }}
                  className="py-0"
                >
                  Randomize 🎲
                </Button>
              </div>
              <FormControl>
                <Input placeholder="my-awesome-url" {...field} maxLength={24} />
              </FormControl>
              <FormDescription className="break-words">
                Enter a custom slug for your URL. <br />
                It will look like:{' '}
                <strong>
                  https://shortys.vercel.app/
                  {form.getValues().slug}
                </strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={
            form.getValues().slug === '' ||
            form.getValues().url === '' ||
            isSubmitting
          }
        >
          Create 🚀
        </Button>
      </form>
    </Form>
  );
}
