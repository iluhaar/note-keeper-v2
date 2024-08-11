import { Badge } from "@/components/ui/badge";

const Tag = ({ value }: { value: string }) => {
  return (
    <Badge className="px-2 cursor-pointer">
      <p>{value}</p>
    </Badge>
  );
};

export default Tag;
