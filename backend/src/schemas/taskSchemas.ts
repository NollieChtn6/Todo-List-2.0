import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ message: "title must be a string" })
    .min(4, { message: "title must have at least 4 characters" })
    .max(200),
  description: z.string({ message: "description must be a string" }).optional(),
  tags: z
    .array(z.object({ id: z.number().int() }), { message: "tags must be an array of objects" })
    .optional(),
});

export type CreateTaskAPIInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z
    .string({ message: "title must be a string" })
    .min(4, { message: "title must have at least 4 characters" })
    .max(200),
  description: z.string({ message: "description must be a string" }).optional(),
  tags: z
    .array(z.object({ id: z.number().int() }), { message: "tags must be an array of objects" })
    .optional(),
});

export type UpdateTaskAPIInput = z.infer<typeof updateTaskSchema>;

export const updateTaskStatusSchema = z.object({
  isComplete: z.boolean(),
});

export type UpdateTaskStatusAPIInput = z.infer<typeof updateTaskStatusSchema>;
