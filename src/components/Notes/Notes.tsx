import { useNotesContext } from "../../Context/NotesContext";
import Note from "./Note";

const Notes = () => {
  const { userNotes } = useNotesContext();

  return (
    <div className="notes-wrapper">
      {userNotes.map(({ note, id }: UserNotes) => (
        <Note key={id} note={note} id={id} />
      ))}
    </div>
  );
};

export default Notes;
