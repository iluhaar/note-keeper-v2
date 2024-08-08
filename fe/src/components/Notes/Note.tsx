import { Link } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNotesContext } from "@/Context/NotesContext";

const Note = ({ note, id }: UserNotes) => {
  const { deleteNote } = useNotesContext() as Context;

  const title = note.split("\n")[0].replaceAll("#", "");
  const content = note
    .split("\n")
    .filter((n) => n !== "")
    .filter((n) => n !== " ")
    .slice(1)
    .join("\n")
    .replaceAll("#", "");

  return (
    <Card className="flex-1 text-left p-5 dark:bg-slate-800 shadow-sm h-80 max-w-[174px] min-h-[175px] sm:min-w-[15rem] w-[15rem]">
      <CardTitle className="flex flex-row justify-between items-center">
        <Link to={`${id}`}>{title}</Link>
        <span
          title="delete"
          className="cursor-pointer text-slate-100 hover:text-slate-500"
          onClick={() => deleteNote(id)}
        >
          X
        </span>
      </CardTitle>
      <CardContent className="pt-10 w-[150px] h-[200px]">
        <p className="w-[150px] h-[200px] max-h-[200px] text-ellipsis overflow-hidden">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default Note;
