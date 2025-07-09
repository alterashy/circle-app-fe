import type { ReplyEntity } from "@/entities/reply.entity";

export type Reply = ReplyEntity & {
  isLiked: boolean;
  likesCount: number;
};

export type ReplyResponseDTO = {
  status: string;
  code: number;
  message: string;
  data: {
    replies: Reply[];
  };
};
