import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle({ className }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5 transition-colors dark:text-foreground hover:bg-slate-100 dark:hover:bg-slate-400",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}