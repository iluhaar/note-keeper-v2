import { useNotesContext } from "../../Context/NotesContext";
import Note from "./Note";

const Notes = () => {
  const { userNotes } = useNotesContext() as Context;

  if (!userNotes || userNotes.length < 1) {
    return <h2>No notes yet</h2>;
  }

  const content = userNotes.map(({ note, id, tags }: UserNotes) => {
    return (
      <div className="flex flex-col" key={id}>
        <Note note={note} id={id} tags={tags} />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-row gap-2 mt-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-stretch sm:pl-0">
        {content}
      </div>
    </>
  );
};

export default Notes;
