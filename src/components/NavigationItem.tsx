import { CircleUserRound, Heart, House, UserRoundSearch } from "lucide-react";

export type NavigationItemType = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

export const getNavigationItems = (username: string): NavigationItemType[] => [
  {
    label: "Home",
    to: "/",
    icon: <House />,
  },
  {
    label: "Search",
    to: "/search",
    icon: <UserRoundSearch />,
  },
  {
    label: "Follow",
    to: "/follow",
    icon: <Heart />,
  },
  {
    label: "Profile",
    to: `/profile/${username}`,
    icon: <CircleUserRound />,
  },
];
