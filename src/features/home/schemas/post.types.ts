import type { PostEntity } from "@/entities/post.entity";

export type Post = PostEntity & {
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
};
