"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useMessage } from "@/hooks/message-hook";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./schema";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { MessageSquareText } from "lucide-react";
import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyBadge from "./CopyBadge";

import { cn, getPreviousElementFromList } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/timer";

export function InputForm() {
  const currentPerserveLength = 7;

  const messageState = useMessage();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatInput: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      messageState.addMessage("user", values.chatInput);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      const localInputList = [
        ...messageState.message,
        ["user", values.chatInput],
      ];
      const response = await axios.post("/api/gemini", {
        chatInput: getPreviousElementFromList(
          localInputList.map((msg) => {
            if (msg[0] === "user") {
              return "This is user's previous input chat: " + msg[1];
            } else {
              return "This is your previous response: " + msg[1];
            }
          }),
          7
        ),
      });
      console.log(response.data);
      messageState.addMessage("gemini", response.data);
      form.reset();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
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
      <div className="pb-10">
        {messageState.message.map((message, index) => {
          let bgColor = "rounded-md p-2 m-4";
          if (messageState.message.length - index > currentPerserveLength - 1) {
            bgColor = "rounded-md p-2 m-4 bg-red-500/10 bg-red-500/10";
          }
          return (
            <div key={index}>
              <div className={bgColor}>
                {message[0] == "user" && (
                  <>
                    <span className="font-bold">User: &nbsp;</span>
                    <br></br>
                    <span>{message[1]}</span>
                  </>
                )}
                {message[0] == "gemini" && (
                  <>
                    <span className="font-bold">Gemini: &nbsp;</span>
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => {
                          return (
                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-md">
                              <pre {...props} />
                            </div>
                          );
                        },
                        li: ({ node, ...props }) => (
                          <div className="py-2 flex">
                            <span className="font-bold text-lg">•</span>
                            <span>&nbsp;&nbsp;</span>
                            <li {...props}></li>
                          </div>
                        ),
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-([\w+]+)/.exec(
                            className || ""
                          );
                          return match ? (
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p>{match[1]}</p>
                                <CopyBadge
                                  copyString={String(children).replace(
                                    /\n$/,
                                    ""
                                  )}
                                ></CopyBadge>
                              </div>
                              <Prism
                                // {...rest}
                                PreTag="div"
                                language={match[1] === "c++" ? "cpp" : match[1]}
                                style={dracula}
                              >
                                {String(children).replace(/\n$/, "")}
                              </Prism>
                            </div>
                          ) : (
                            <code
                              {...rest}
                              className={cn(
                                className,
                                "bg-black/10 rounded-lg p-1"
                              )}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                      className="text-sm overflow-hidden leading-7"
                    >
                      {message[1] || ""}
                    </ReactMarkdown>
                  </>
                )}
              </div>
              <hr className="solid flex-grow border-b self-center"></hr>
            </div>
          );
        })}
      </div>
      {isLoading && <Loader></Loader>}
      <div className="h-10"></div>
      <div className="fixed bottom-0 w-[60vw] opacity-transition">
        <div className="pt-20 pb-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex"
            >
              <div className="w-full pr-4">
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
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">
                <MessageSquareText></MessageSquareText>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
