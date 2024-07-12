import { useParams } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";
import MDEditor from "@uiw/react-md-editor";

const NotePreview = () => {
  const { id } = useParams();

  const { userNotes } = useNotesContext() as Context;

  const note = userNotes.find(
    (note: UserNotes) => note.id === Number(id)
  )?.note;

  return (
    <>
      <MDEditor.Markdown source={note} style={{ whiteSpace: "pre-wrap" }} />
    </>
  );
};

export default NotePreview;
