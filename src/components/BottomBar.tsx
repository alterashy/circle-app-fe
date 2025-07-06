import { navigationItems } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export const BottomBar = () => {
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

        <Button variant={"default"} className="w-fit">
          <Plus />
        </Button>

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
