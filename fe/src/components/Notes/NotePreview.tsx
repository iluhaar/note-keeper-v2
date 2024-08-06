import { Link, useNavigate, useParams } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";

const NotePreview = () => {
  const { id } = useParams();

  const { userNotes, deleteNote, theme } = useNotesContext() as Context;

  const navigate = useNavigate();

  const note = userNotes.find((note: UserNotes) => note.id === id)?.note ?? "";

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(note);
  };

  const handleDelete = () => {
    if (id === undefined) return;
    deleteNote(id).then(() => navigate("/notes"));
  };

  return (
    <div className="gap-2 flex flex-col h-full">
      <MDEditor.Markdown
        data-color-mode={theme ? "dark" : "light"}
        source={note}
        style={{ whiteSpace: "pre-wrap" }}
        className="h-full p-5"
      />
      <div className="flex flex-row gap-2 flex-start">
        <Link to={`/editor/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleCopyToClipboard}>Copy to clipboard</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default NotePreview;
