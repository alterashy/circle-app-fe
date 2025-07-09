import { PostForm } from "@/features/home/components/PostForm";
import { Plus } from "lucide-react";
import { useState } from "react";
import { getNavigationItems } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAuthStore } from "@/stores/auth.store";

export const BottomBar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const navigationItems = getNavigationItems(
    currentUser?.username ?? "profile"
  );

  return (
    <div className="flex justify-around items-center w-screen h-14 bg-secondary">
      <div className="flex justify-around items-center w-full max-w-md h-14 bg-secondary">
        {navigationItems.slice(0, 2).map((item) => (
          <NavigationMenu
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="w-full">
            <Button
              variant="default"
              className="w-fit justify-center gap-2 text-secondary lg:w-full lg:justify-start"
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg lg:min-w-1/2">
            <DialogHeader>
              <DialogTitle className="mb-4">Create Post</DialogTitle>
              <div className="w-full">
                <PostForm onCloseDialog={() => setOpen(false)} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {navigationItems.slice(2, 4).map((item) => (
          <NavigationMenu
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
