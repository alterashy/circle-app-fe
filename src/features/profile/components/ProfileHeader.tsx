import gradientBanner from "@/assets/images/gradientBanner.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { UserEntity } from "@/entities/user.entity";
import { useLocation } from "@tanstack/react-router";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { ProfileEditDialog } from "./ProfileEditDialog";
import { useAuthStore } from "@/stores/auth.store";

export const ProfileHeader = (user: UserEntity) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  const currentPathname = pathname.split("/")[2];
  const isCurrentUser = currentPathname === currentUser?.username;

  return (
    <div>
      <div className="bg-secondary rounded-md p-4 w-full relative">
        <div className="flex flex-col gap-4">
          <div>
            <div className="relative group">
              <div className="h-14 w-full rounded-md overflow-hidden">
                <img
                  src={user.profile?.bannerUrl || gradientBanner}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-8 left-6">
                <Avatar className="size-12 ring-2 ring-offset-[3px] ring-offset-background">
                  <AvatarImage
                    src={
                      user.profile?.avatarUrl ||
                      `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user.profile?.fullName}`
                    }
                  />
                </Avatar>
              </div>
              {isCurrentUser ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="absolute top-16 right-0 px-4 py-0.75 text-xs"
                    >
                      <UserRoundPen />
                      <span className="hidden md:inline">Edit Profile</span>
                    </Button>
                  </DialogTrigger>
                  <ProfileEditDialog onCloseDialog={() => setOpen(false)} />
                </Dialog>
              ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="absolute top-16 right-0 px-4 py-0.75 text-xs"
                    >
                      Follow
                    </Button>
                  </DialogTrigger>
                  <ProfileEditDialog onCloseDialog={() => setOpen(false)} />
                </Dialog>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-6 items-baseline">
            <h3 className="font-semibold">✨ {user.profile?.fullName} ✨</h3>
            <span className="text-xs text-muted-foreground">
              @{user.username}
            </span>
            <span className="text-xs">{user.profile?.bio}</span>
            <div className="flex flex-row gap-3 items-baseline">
              <div>
                <span className="text-xs">{user.followersCount}</span>
                <span className=" text-xs text-muted-foreground">
                  {" "}
                  Followers
                </span>
              </div>
              <div>
                <span className="text-xs">{user.followingsCount}</span>
                <span className="text-xs text-muted-foreground">
                  {" "}
                  Followings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
