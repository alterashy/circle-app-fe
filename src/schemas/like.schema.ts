import { z } from "zod";

export const likeSchema = z.object({
  postId: z.string().uuid(),
});

export type LikeDTO = z.infer<typeof likeSchema>;

export const unlikeSchema = z.object({
  postId: z.string().uuid(),
});

export type UnlikeDTO = z.infer<typeof unlikeSchema>;
