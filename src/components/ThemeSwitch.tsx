import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "./ui/theme";
import { Switch } from "./ui/switch";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-secondary rounded-lg shadow-sm">
      <Sun
        className={cn(
          "h-4 w-4 transition-colors",
          !isDark ? "text-yellow-500" : "text-muted-foreground"
        )}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary cursor-pointer"
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-colors",
          isDark ? "text-indigo-400" : "text-muted-foreground"
        )}
      />
    </div>
  );
}
