"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

export default function AddCommandForm({}: Props) {
  const schema = z
    .object({
      prefixKey: z.string(),
      prefixString: z.string(),
    })
    .refine(
      (val) => {
        const storedValue = localStorage.getItem(String(val.prefixKey));
        return storedValue === null;
      },
      {
        message: "This name is already used",
      }
    );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      prefixKey: "",
      prefixString: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    localStorage.setItem(values.prefixKey, values.prefixString);
  };

  return (
    <div className="fixed bottom-0 right-0 w-[15vw] p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="prefixKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prefix Name</FormLabel>
                <FormControl>
                  <Input placeholder="mcq" {...field} className="text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prefixString"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prefix String</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your message here."
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center py-4">
            <Button
              type="submit"
              className="bg-white w-full text-black hover:bg-slate-400"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
