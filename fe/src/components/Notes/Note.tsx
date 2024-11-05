import { Link } from "react-router-dom";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNotesContext } from "@/Context/NotesContext";
import Tag from "../Tag/Tag";

const Note = ({ note, id, tags }: Props) => {
  const { userTags, deleteNote } = useNotesContext() as Context;

  const title = note.split("\n")[0].replaceAll("#", "");
  const content = note
    .split("\n")
    .filter((n) => n !== "")
    .filter((n) => n !== " ")
    .slice(1)
    .join("\n")
    .replaceAll("#", "");

  const tagsContent = (
    <div className="flex flex-row flex-wrap pt-1 gap-1">
      {tags &&
        tags.length > 0 &&
        tags.map((tag: Tag) => {
          const color = userTags[tag.id]?.color;

          return <Tag key={tag.id} label={tag.label} color={color} />;
        })}
    </div>
  );

  return (
    <Card className="flex-1 text-left sm:p-5 dark:bg-slate-800 shadow-sm h-80  w-[12rem] max-w-[180px] min-h-[175px] p-2 sm:min-w-[15rem] sm:max-w-[174px]">
      <CardTitle className="flex flex-col items-left pl-1">
        {tagsContent}
        <div className="flex flex-row justify-between pl-1 pt-1">
          <Link to={`${id}`}>{title}</Link>
          <span
            title="delete"
            className="cursor-pointer text-slate-400 hover:text-slate-500 dark:hover:text-slate-400"
            onClick={() => deleteNote(id)}
            role="button"
          >
            X
          </span>
        </div>
      </CardTitle>
      <CardContent className="pt-10 w-[150px]">
        <p className="max-h-[200px] text-ellipsis overflow-hidden sm:w-[150px] sm:max-h-[250px] ">
          {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default Note;
interface Props {
  id: string;
  note: string;
  tags: Tag[];
}
