import { Badge } from "@/components/ui/badge";
import { useNotesContext } from "@/Context/NotesContext";
import { cn } from "@/lib/utils";

const Tag = ({ label, color }: Props) => {
  const { setFilter } = useNotesContext() as Context;
  return (
    <Badge
      className={cn("px-2")}
      style={{
        backgroundColor: `${color}`,
      }}
      onClick={() => setFilter({ value: label, type: "tag" })}
    >
      <p>{label}</p>
    </Badge>
  );
};

export default Tag;

interface Props {
  label: string;
  color: string;
}
