import type { UserEntity } from "@/entities/user.entity";

export type User = UserEntity & {
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
};

export type UserResponseDTO = {
  status: string;
  code: number;
  message: string;
  data: {
    user: User;
  };
};
