import { useNotesContext } from "../../Context/NotesContext";
import Note from "./Note";

const Notes = () => {
  const { userNotes } = useNotesContext() as Context;

  return (
    <>
      <div className="flex flex-row gap-2 mt-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-start sm:pl-0">
        {userNotes && userNotes.length > 0 ? (
          userNotes.map(({ note, id }: UserNotes) => (
            <Note key={id} note={note} id={id} />
          ))
        ) : (
          <h2>No notes yet</h2>
        )}
      </div>
    </>
  );
};

export default Notes;
