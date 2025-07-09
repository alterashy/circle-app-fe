import gradientBanner from "@/assets/images/gradientBanner.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth.store";
import { useLocation } from "@tanstack/react-router";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { ProfileEditDialog } from "./ProfileEditDialog";

export const UserCard = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="bg-secondary rounded-md p-4 w-full relative">
        <div className="flex flex-col gap-4">
          <div>
            <div className="relative group">
              <div className="h-14 w-full rounded-md overflow-hidden">
                <img
                  src={currentUser.profile.bannerUrl || gradientBanner}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-8 left-6">
                <Avatar className="size-12 ring-2 ring-offset-[3px] ring-offset-background">
                  <AvatarImage
                    src={
                      currentUser.profile.avatarUrl ||
                      `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${currentUser.profile.fullName}`
                    }
                  />
                </Avatar>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  {pathname === `/profile` ||
                  pathname === `/profile/${currentUser?.username}` ? (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="absolute top-16 right-0 px-4 py-0.75 text-xs"
                    >
                      <UserRoundPen /> Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="absolute top-16 right-0 px-4 py-0.75 text-xs"
                    >
                      <UserRoundPen />
                    </Button>
                  )}
                </DialogTrigger>
                <ProfileEditDialog onCloseDialog={() => setOpen(false)} />
              </Dialog>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-6 items-baseline">
            <h3 className="font-semibold">
              ✨ {currentUser.profile?.fullName} ✨
            </h3>
            <span className="text-xs text-muted-foreground">
              @{currentUser.username}
            </span>
            <span className="text-xs">{currentUser.profile?.bio}</span>
            <div className="flex flex-row gap-3 items-baseline">
              <div>
                <span className="text-xs">{currentUser.followersCount}</span>
                <span className=" text-xs text-muted-foreground">
                  {" "}
                  Followers
                </span>
              </div>
              <div>
                <span className="text-xs">{currentUser.followingsCount}</span>
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
