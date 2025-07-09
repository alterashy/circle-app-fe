import type { FollowEntity } from "@/entities/follow.entity";

export type Follow = FollowEntity & { isFollow: boolean };
