import type { PostEntity } from "./post.entity";
import type { UserEntity } from "./user.entity";

export interface LikeEntity {
  id: string;
  content?: string;
  thread?: PostEntity;
  user?: UserEntity;
  createdAt: string;
  updatedAt: string;
}
