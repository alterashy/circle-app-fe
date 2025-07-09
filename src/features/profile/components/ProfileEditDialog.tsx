import gradientBanner from "@/assets/images/gradientBanner.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useProfileUpdate } from "../hooks/useProfileUpdate";

type ProfileEditDialogProps = {
  onCloseDialog: () => void;
};

export const ProfileEditDialog = ({
  onCloseDialog,
}: ProfileEditDialogProps) => {
  const currentUser = useAuthStore((state) => state.user);

  const { data: userProfile } = useQuery({
    queryKey: ["users", currentUser?.username],
    queryFn: async () => {
      const response = await api.get(`/users/profile/${currentUser?.username}`);
      return response.data.data.user;
    },
    enabled: !!currentUser?.username,
  });

  const {
    register,
    avatarUrl,
    bannerUrl,
    avatarInputRef,
    bannerInputRef,
    handleAvatarChange,
    handleBannerChange,
    handleRemoveFile,
    registerAvatarRef,
    registerBannerRef,
    registerAvatarChange,
    registerBannerChange,
    restRegisterAvatar,
    restRegisterBanner,
    isPending,
    handleSubmit,
    onSubmitUpdate,
  } = useProfileUpdate(onCloseDialog);

  return (
    <DialogContent className="max-w-md rounded-none h-screen md:h-fit md:rounded-md">
      <form onSubmit={handleSubmit(onSubmitUpdate)}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative group">
            <div
              className="h-14 w-full rounded-md overflow-hidden cursor-pointer"
              onClick={() => bannerInputRef.current?.click()}
            >
              <img
                src={
                  bannerUrl || currentUser?.profile?.bannerUrl || gradientBanner
                }
                alt="banner"
              />
            </div>
            <Input
              {...restRegisterBanner}
              type="file"
              accept="image/*"
              ref={(e) => {
                registerBannerRef(e);
                bannerInputRef.current = e;
              }}
              onChange={(e) => {
                registerBannerChange(e);
                handleBannerChange(e);
              }}
              className="hidden"
            />
            <div className="absolute top-8 left-6">
              <Avatar
                className="size-12 ring-2 ring-offset-[3px] ring-offset-background cursor-pointer"
                onClick={() => avatarInputRef.current?.click()}
              >
                <AvatarImage
                  src={
                    avatarUrl ||
                    userProfile?.profile?.avatarUrl ||
                    `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${userProfile?.profile?.fullName}`
                  }
                />
              </Avatar>
            </div>
            <Input
              {...restRegisterAvatar}
              type="file"
              accept="image/*"
              ref={(e) => {
                registerAvatarRef(e);
                avatarInputRef.current = e;
              }}
              onChange={(e) => {
                registerAvatarChange(e);
                handleAvatarChange(e);
              }}
              className="hidden"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 mt-6">
            <Label htmlFor="fullname" className="text-right">
              Fullname
            </Label>
            <Input
              {...register("fullName", { required: true })}
              id="fullname"
              defaultValue={userProfile?.profile?.fullName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              {...register("username", { required: true })}
              id="username"
              defaultValue={userProfile?.username}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Input
              {...register("bio", { required: true })}
              id="bio"
              defaultValue={userProfile?.profile?.bio}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={handleRemoveFile}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending} className="text-white">
            {isPending ? (
              <div className="flex items-center gap-2">
                Saving... <Spinner size="small" />
              </div>
            ) : (
              <div>Save</div>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
