import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Tag = ({ label, color }: Props) => {
  return (
    <Badge className={cn("px-2 cursor-pointer", `${color}`)}>
      <p>{label}</p>
    </Badge>
  );
};

export default Tag;

interface Props {
  label: string;
  color: string;
}
