import type { PostEntity } from "@/entities/post.entity";

export type Post = PostEntity & {
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
};

export type PostResponseDTO = {
  status: string;
  code: number;
  message: string;
  data: {
    posts: Post[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasNextPage: boolean;
    };
  };
};
