import { useState } from "react";
import { useNotesContext } from "../../Context/NotesContext";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Card } from "../ui/card";

const SearchBar = () => {
  const [notes, setNotes] = useState<UserNotes[]>([]);

  const { searchInNotes } = useNotesContext() as Context;

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.value.length > 3) {
      setNotes(searchInNotes(input.value));
    }
  };

  return (
    <div className="flex flex-col gap-1 w-4/6">
      <Input type="text" placeholder="Search..." onChange={handleSearch} />

      <div className="flex flex-row gap-3 pt-2 bg-slate-400 rounded-sm p-3 dark:bg-slate-100">
        {notes &&
          notes.map((note: UserNotes) => (
            <Card
              className="flex-1 max-w-40
             text-left p-5 dark:bg-slate-800 shadow-sm"
            >
              <Link
                key={note.id}
                to={`/notes/${note.id}`}
                className="underline"
              >
                {note.note.split("\n")[0].replaceAll("#", "")}
              </Link>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
