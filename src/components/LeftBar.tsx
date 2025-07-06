import { Link } from "@tanstack/react-router";
import { navigationItems } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";
import { Button } from "./ui/button";
import { LogOut, Plus } from "lucide-react";

export const LeftBar = () => {
  return (
    <div className="h-full flex flex-col p-4">
      {/* Logo */}
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

      {/* Menu Items */}
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

      {/* Logout Button (bottom) */}
      <div className="pt-4 mt-auto">
        <Button
          variant="destructive"
          className="w-fit justify-center gap-2 text-secondary lg:w-full lg:justify-start"
        >
          <LogOut />
          <span className="md:hidden lg:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};
