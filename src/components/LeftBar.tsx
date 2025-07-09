import { PostForm } from "@/features/home/components/PostForm";
import { useAuthStore } from "@/stores/auth.store";
import { Link, useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { LogOut, Plus } from "lucide-react";
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
import { DialogDescription } from "@radix-ui/react-dialog";

export const LeftBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    navigate({ to: "/login" });
  };

  const [open, setOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const navigationItems = getNavigationItems(
    currentUser?.username ?? "profile"
  );

  return (
    <div className="flex flex-col p-6 h-full">
      <div className="mb-6">
        <div className="hidden md:hidden lg:block">
          <Link to="/">
            <h1 className="text-3xl text-primary font-bold">Circle</h1>
          </Link>
        </div>
        <div className="hidden md:block lg:hidden">
          <Link to="/">
            <h1 className="text-4xl text-primary text-center font-bold">C</h1>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {navigationItems.map((item) => (
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
              <span className="md:hidden lg:block">Create Post</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg lg:min-w-1/2">
            <DialogHeader>
              <DialogTitle className="mb-4">Create Post</DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
            </DialogHeader>
            <div className="w-full">
              <PostForm onCloseDialog={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-4 mt-auto">
        <Button
          variant="outline"
          className="w-fit justify-center gap-2 lg:w-full lg:justify-start"
          onClick={handleLogout}
        >
          <LogOut />
          <span className="md:hidden lg:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};
