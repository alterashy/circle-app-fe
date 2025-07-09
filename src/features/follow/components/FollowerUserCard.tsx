import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useToggleFollow } from "../hooks/useFollowToggle";
import type { Follow } from "../schemas/follow.type";
import { toast } from "sonner";

type FollowUserProps = {
  FollowUser: Follow;
};

export const FollowerUserCard = ({ FollowUser }: FollowUserProps) => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const [isFollow, setIsFollow] = useState(FollowUser.isFollow);
  const toggleFollow = useToggleFollow(FollowUser.follower.id);

  const handleToggle = () => {
    toggleFollow.mutate(undefined, {
      onSuccess: (data) => {
        setIsFollow(data.isFollow);
        toast.success(data.isFollow ? "Followed" : "Unfollowed");
      },
    });
  };

  const isCurrentUser = currentUser?.id === FollowUser.follower.id;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center w-full">
          <Avatar
            className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
            onClick={() =>
              navigate({ to: `/profile/${FollowUser.follower.username}` })
            }
          >
            <AvatarImage
              src={
                FollowUser.follower.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${FollowUser.follower.profile?.fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
          <div
            className="flex flex-col justify-center cursor-pointer hover:text-primary"
            onClick={() =>
              navigate({ to: `/profile/${FollowUser.follower.username}` })
            }
          >
            <span className="text-xs font-semibold">
              {FollowUser.follower.profile?.fullName}
            </span>
            <span className="text-xs text-muted-foreground">
              @{FollowUser.follower.username}
            </span>
          </div>
        </div>

        {!isCurrentUser && (
          <Button
            variant={isFollow ? "secondary" : "outline"}
            size="sm"
            onClick={handleToggle}
            disabled={toggleFollow.isPending}
          >
            <span className="text-xs">
              {toggleFollow.isPending
                ? "..."
                : isFollow
                ? "Unfollow"
                : "Follow"}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
