export type LikeReplyDTO = {
  replyId: string;
};

export type LikeReplyResponseDTO = {
  replyId: string;
  isLiked: boolean;
  likesCount: number;
};
