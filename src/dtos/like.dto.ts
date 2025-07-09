import type { LikeEntity } from "@/entities/like.entity";

export type Like = LikeEntity & {
  postId: string;
  userId: string;
  isLiked: boolean;
};

export type LikeResponseDTO = {
  status: string;
  code: number;
  message: string;
  data: {
    postId: string;
    isLiked: boolean;
    likesCount: number;
  };
};
