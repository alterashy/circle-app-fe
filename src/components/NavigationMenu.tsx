import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

type NavigationItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const activeProps = {
  style: {
    fontWeight: "bold",
    color: "#00BC7D",
  },
};

export const NavigationMenu = ({ to, icon, label }: NavigationItemProps) => {
  return (
    <Link to={to} activeProps={activeProps}>
      <Button
        variant={"outline"}
        className="w-fit justify-center gap-2 lg:w-full lg:justify-start"
      >
        {icon}
        <span className="hidden lg:block">{label}</span>
      </Button>
    </Link>
  );
};
