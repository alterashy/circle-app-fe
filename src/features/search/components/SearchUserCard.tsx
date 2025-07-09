import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { UserEntity } from "@/entities/user.entity";
import { useToggleFollow } from "@/features/follow/hooks/useFollowToggle";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type SearchUserCardProps = {
  searcedUsers: UserEntity;
};

export const SearchUserCard = ({ searcedUsers }: SearchUserCardProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [isFollow, setIsFollow] = useState<boolean>(searcedUsers.isFollow);
  const toggleFollow = useToggleFollow(searcedUsers.id);

  const handleToggle = () => {
    toggleFollow.mutate(undefined, {
      onSuccess: (data) => setIsFollow(data.isFollow),
    });
  };

  const isSelf = searcedUsers.username === currentUser?.username;

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 items-center w-full">
        <Avatar
          className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
          onClick={() => navigate({ to: `/profile/${searcedUsers.username}` })}
        >
          <AvatarImage
            src={
              searcedUsers.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${searcedUsers.profile?.fullName}`
            }
            alt="user-avatar"
          />
        </Avatar>
        <div
          className="flex flex-col justify-center cursor-pointer hover:text-primary"
          onClick={() => navigate({ to: `/profile/${searcedUsers.username}` })}
        >
          <span className="text-xs font-semibold">
            {searcedUsers.profile?.fullName}
          </span>
          <span className="text-xs text-muted-foreground">
            @{searcedUsers.username}
          </span>
        </div>
      </div>

      {!isSelf && (
        <Button
          variant={isFollow ? "secondary" : "outline"}
          size="sm"
          onClick={handleToggle}
          disabled={toggleFollow.isPending}
        >
          {toggleFollow.isPending ? (
            <Spinner />
          ) : (
            <span className="text-xs">{isFollow ? "Unfollow" : "Follow"}</span>
          )}
        </Button>
      )}
    </div>
  );
};
