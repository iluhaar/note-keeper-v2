import { useNotesContext } from "@/Context/NotesContext";
import { Switch } from "../ui/switch";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useNotesContext() as Context;

  return (
    <div>
      <Switch checked={theme} onCheckedChange={(e) => toggleTheme(e)} />
    </div>
  );
};

export default ThemeToggle;
