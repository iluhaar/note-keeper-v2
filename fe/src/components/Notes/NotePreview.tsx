import { Link, useNavigate, useParams } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";
import MDEditor from "@uiw/react-md-editor";

const NotePreview = () => {
  const { id } = useParams();

  const { userNotes, deleteNote } = useNotesContext() as Context;

  const navigate = useNavigate();

  const note = userNotes.find((note: UserNotes) => note.id === id)?.note ?? "";

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(note);
  };

  const handleDelete = () => {
    if (id === undefined) return;
    deleteNote(id);
    navigate("/notes");
  };

  return (
    <>
      <MDEditor.Markdown source={note} style={{ whiteSpace: "pre-wrap" }} />
      <div>
        <Link to={`/editor/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleCopyToClipboard}>Copy to clipboard</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
};

export default NotePreview;
