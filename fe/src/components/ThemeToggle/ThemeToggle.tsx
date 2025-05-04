import { memo } from "react";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { useUIContext } from "@/Context/UIContext";

const ThemeToggle = memo(({ open }: { open: boolean }) => {
  const { theme, toggleTheme, showNavbar } = useUIContext() as UIContext;

  return (
    <div
      className={cn(
        "transition-opacity duration-200",
        !showNavbar && "opacity-50 hover:opacity-100"
      )}
    >
      <Switch
        className={cn(
          open ? "pl-3" : "",
          !showNavbar && "[&>span]:!transition-none [&>span]:!transform-none"
        )}
        checked={theme}
        onCheckedChange={(e) => toggleTheme(e)}
      />
    </div>
  );
});

export default ThemeToggle;
