import { memo } from "react";
import { Switch } from "../ui/switch";

import { useUIContext } from "@/Context/UIContext";

const ThemeToggle = memo(({ open }: { open: boolean }) => {
  const { theme, toggleTheme } = useUIContext() as UIContext;

  return (
    <div>
      <Switch
        className={`${open ? "pl-3" : ""}`}
        checked={theme}
        onCheckedChange={(e) => toggleTheme(e)}
      />
    </div>
  );
});

export default ThemeToggle;
