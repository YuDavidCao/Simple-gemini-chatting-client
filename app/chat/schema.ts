"use client";

import * as z from "zod";

export const formSchema = z.object({
  chatInput: z.string().min(1, { message: "Field cannot be empty" }),
});
