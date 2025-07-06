import type { LikeEntity } from "./like.entity";
import type { ReplyEntity } from "./reply.entity";
import type { UserEntity } from "./user.entity";

export interface PostEntity {
  id: string;
  content: string;
  images: string;
  user?: UserEntity;
  likes?: LikeEntity[];
  replies?: ReplyEntity[];
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
}
