import type { ProfileEntity } from "@/entities/profile.entity";
import type { UserEntity } from "@/entities/user.entity";

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

export interface SearchResponse {
  code: number;
  status: string;
  message: string;
  data: {
    user: UserProfile;
  };
}
