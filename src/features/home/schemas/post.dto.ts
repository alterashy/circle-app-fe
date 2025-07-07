import type { Post } from "./post.types";

export type PostResponseDTO = {
  status: string;
  code: number;
  message: string;
  data: {
    posts: Post[];
  };
};
