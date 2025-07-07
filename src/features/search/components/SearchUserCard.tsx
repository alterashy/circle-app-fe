import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserEntity } from "@/entities/user.entity";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";

type searchUserCardProps = {
  searcedUsers: UserEntity;
};

export const SearchUserCard = ({ searcedUsers }: searchUserCardProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center w-full">
          <Avatar
            className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
            onClick={() =>
              navigate({ to: `/profile/${searcedUsers.username}` })
            }
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
            onClick={() =>
              navigate({ to: `/profile/${searcedUsers.username}` })
            }
          >
            <span className="text-xs font-semibold">
              {searcedUsers.profile?.fullName}
            </span>
            <span className="text-xs text-muted-foreground">
              @{searcedUsers.username}
            </span>
          </div>
        </div>
        <div>
          {searcedUsers.username !== currentUser?.username && (
            <Button variant={"outline"} size={"sm"}>
              <span className="text-xs">Follow</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
