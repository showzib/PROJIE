import { Toggle as TogglePrimitive } from "radix-ui";
import { Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeProvider";

export function DarkModeToggle({ className }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TogglePrimitive.Root
      pressed={isDark}
      onPressedChange={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        "h-8 w-8 p-2", 
        "",
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </TogglePrimitive.Root>
  );
}