import { useState } from "react";
import { useNotesContext } from "../../Context/NotesContext";
import { Link } from "react-router-dom";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input type="text" placeholder="Search..." onChange={handleSearch} />

      {notes &&
        notes.map((note: UserNotes) => (
          <Link key={note.id} to={`/notes/${note.id}`}>
            {note.note}
          </Link>
        ))}
    </div>
  );
};

export default SearchBar;
