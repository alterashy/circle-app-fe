import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";
import { navigationItems } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/auth.store";
import Cookies from "js-cookie";
import { useState } from "react";

export const LeftBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    navigate({ to: "/login" });
  };

  const [open, setOpen] = useState(false);

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
        <Button
          variant="default"
          className="w-fit justify-center gap-2 text-secondary lg:w-full lg:justify-start"
        >
          <Plus />
          <span className="md:hidden lg:block">Create Post</span>
        </Button>
      </div>

      <div className="pt-4 mt-auto">
        <Button
          variant="destructive"
          className="w-fit justify-center gap-2 text-secondary lg:w-full lg:justify-start"
          onClick={handleLogout}
        >
          <LogOut />
          <span className="md:hidden lg:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};
