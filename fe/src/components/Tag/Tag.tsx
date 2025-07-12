import { Badge } from "@/components/ui/badge";
import { useConvexContext } from "@/Context/ConvexContext";
import { cn } from "@/lib/utils";

const Tag = ({ label, color }: Props) => {
  const { setFilter } = useConvexContext();
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
