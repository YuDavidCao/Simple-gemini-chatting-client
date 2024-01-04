"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import axios from "axios";

export function InputForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<[string, string][]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatInput: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/gemini", {
        chatInput: values.chatInput,
      });
      setMessages((current) => [
        ...current,
        ["user", values.chatInput],
        ["gemini", response.data],
      ]);
      form.reset();
    } catch (error: any) {
      toast({
        title: "Somthing went wrong",
        description: JSON.stringify(error),
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      {/* <div className="pb-10">
        {messages.map((message, index) => {
          return (
            <div key={index} className="py-4 bg-black/40 rounded-md p-4 m-4">
              {message[0] == "user" && (
                <>
                  <span className="font-bold">User: &nbsp;</span>
                  <span>{message[1]}</span>
                </>
              )}
              {message[0] == "gemini" && (
                <>
                  <span className="font-bold">Gemini: &nbsp;</span>
                  <div className="flex flex-col">{message[1]}</div>
                </>
              )}
            </div>
          );
        })}
      </div> */}
      {!isLoading && (
        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
          Gemini is responding...
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="chatInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Prompt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is bridge in german?"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
