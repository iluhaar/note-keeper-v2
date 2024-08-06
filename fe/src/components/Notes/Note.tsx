import { Link } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Note = ({ note, id }: UserNotes) => {
  const title = note.split("\n")[0].replaceAll("#", "");
  const content = note.split("\n").slice(1).join("\n").replaceAll("#", "");

  return (
    <Card className="flex-1 text-left p-5 dark:bg-slate-800 shadow-sm h-80 max-w-[174px] min-w-[174px]">
      <CardTitle>
        <Link to={`${id}`}>{title}</Link>
      </CardTitle>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default Note;
