import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToggleFollow } from "@/features/follow/hooks/useFollowToggle";
import type { SuggestedUser } from "@/features/follow/hooks/useFollowSuggestions";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const SuggestedUserCard = ({
  id,
  username,
  profile,
  followersCount,
  mutualCount,
}: SuggestedUser) => {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const toggleFollow = useToggleFollow(id);
  const currentUser = useAuthStore((state) => state.user);

  const handleToggle = () => {
    toggleFollow.mutate(undefined, {
      onSuccess: (data) => {
        setIsFollow(data.isFollow);
        toast.success(data.isFollow ? "Followed" : "Unfollowed");
      },
    });
  };

  return (
    <div className="flex justify-between items-center gap-3">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate({ to: `/profile/${username}` })}
      >
        <Avatar className="size-9">
          <AvatarImage
            src={
              profile.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${profile.fullName}`
            }
            alt={profile.fullName}
          />
        </Avatar>

        <div className="flex flex-col justify-center leading-snug space-y-[1px]">
          <span className="text-xs font-semibold">{username}</span>
          <span className="text-xs text-muted-foreground">
            {profile.fullName}
          </span>
          <span className="text-xs text-muted-foreground">
            {mutualCount > 0
              ? `${mutualCount} mutual`
              : `${followersCount} followers`}
          </span>
        </div>
      </div>

      {username !== currentUser?.username && (
        <Button
          variant={isFollow ? "secondary" : "outline"}
          size="sm"
          onClick={handleToggle}
          disabled={toggleFollow.isPending}
          className="text-xs"
        >
          {toggleFollow.isPending ? "..." : isFollow ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};
