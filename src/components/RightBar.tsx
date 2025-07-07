import DumbWaysIcon from "@/assets/icons/DumbWays.png";
import { ProfileUser } from "@/features/profile/ProfileUser";
import { useAuthStore } from "@/stores/auth.store";
import { useLocation } from "@tanstack/react-router";
import { Github, Instagram, Linkedin } from "lucide-react";

export const RightBar = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { pathname } = useLocation();

  const isOwnProfilePage =
    pathname === `/profile` || pathname === `/profile/${currentUser?.username}`;

  return (
    <aside className="flex flex-col gap-4 p-6 h-full">
      {!isOwnProfilePage && <ProfileUser />}

      <footer className="flex flex-col gap-2 w-full p-4 rounded-md bg-secondary text-xs">
        <div className="flex gap-1 items-center flex-wrap">
          <span>Developed by Syifa Maulaya •</span>
          <a
            href="https://www.linkedin.com/in/syifamaulaya/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="LinkedIn"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
              alt="LinkedIn"
              className="size-4"
            />
          </a>
          <a
            href="https://www.instagram.com/alterashy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="Instagram"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
              alt="Instagram"
              className="size-4"
            />
          </a>
          <a
            href="https://github.com/alterashy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="GitHub"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
              alt="GitHub"
              className="size-4"
            />
          </a>
        </div>

        <div className="flex gap-1 items-center text-muted-foreground">
          <span>Powered by</span>
          <a
            href="https://dumbways.id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={DumbWaysIcon}
              alt="DumbWays Indonesia"
              className="h-4 object-contain"
            />
          </a>
          <span>DumbWays Indonesia</span>
        </div>
      </footer>
    </aside>
  );
};
