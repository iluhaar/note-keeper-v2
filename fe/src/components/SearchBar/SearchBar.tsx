import { useState } from "react";
import { useConvexContext } from "../../Context/ConvexContext";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { UserNotes } from "@/types/types";

const SearchBar = () => {
  const [notes, setNotes] = useState<UserNotes[]>([]);

  const { searchInNotes } = useConvexContext();

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
              key={note._id}
              className="flex-1 max-w-40
             text-left p-5 dark:bg-slate-800 shadow-sm"
            >
              <Link to={`/notes/${note._id}`} className="underline">
                {note.note.split("\n")[0].replaceAll("#", "")}
              </Link>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
