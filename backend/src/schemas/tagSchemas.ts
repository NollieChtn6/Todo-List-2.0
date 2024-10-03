import { z } from "zod";

export const createTagSchema = z.object({
  label: z.string({ message: "label must be a string" }).min(1, { message: "label is required" }),
  color: z.string().regex(/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/, {
    message: "color must be a valid hex code",
  }),
});

export type CreateTagAPIInput = z.infer<typeof createTagSchema>;

export const updateTagSchema = z.object({
  label: z.string({ message: "label must be a string" }).min(1, { message: "label is required" }),
  color: z.string().regex(/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/, {
    message: "color must be a valid hex code",
  }),
});

export type UpdateTagAPIInput = z.infer<typeof updateTagSchema>;
