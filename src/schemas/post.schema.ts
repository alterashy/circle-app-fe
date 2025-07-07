import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.instanceof(FileList).optional(),
});

export type CreatePostSchemaDTO = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.instanceof(FileList).optional(),
});

export type UpdatePostSchemaDTO = z.infer<typeof updatePostSchema>;

export const deletePostSchema = z.object({
  postId: z.string().uuid(),
});

export type DeletePostSchemaDTO = z.infer<typeof deletePostSchema>;
