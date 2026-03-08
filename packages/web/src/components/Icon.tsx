import { cn } from "@/lib/utils";
import { ICONS } from "@/constants/icons";

type IconProps = {
  img: keyof typeof ICONS;
  onClick?: () => void;
};

const Icon = ({ img, onClick }: IconProps) => {
  return (
    <div
      className={cn(
        "hidden sm:block sm:pt-2 cursor-pointer",
        "text-foreground hover:text-primary transition-colors",
        "dark:text-slate-400 dark:hover:text-slate-200"
      )}
      title={img}
      onClick={onClick}
    >
      {ICONS[img]}
    </div>
  );
};

export default Icon;
