import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";

const Editor = ({ place }: Props) => {
  const { id } = useParams();

  const { addNote, userNotes } = useNotesContext() as Context;

  const [value, setValue] = useState<string | undefined>("");

  const editorHeight = place === "home" ? "35vh" : "80vh";

  const handleClear = () => {
    setValue("");
  };

  useEffect(() => {
    if (id !== undefined) {
      setValue(userNotes.find((note: UserNotes) => note.id === id)?.note);
    }
  }, [id]);

  return (
    <div className="main-content">
      <MDEditor
        value={value}
        onChange={(e) => setValue(e)}
        height={editorHeight}
      />

      {place !== "home" && (
        <div className="control__buttons">
          <button
            disabled={value === "" || value === undefined}
            onClick={() => {
              if (value === undefined) return;
              addNote(value);
            }}
          >
            Save
          </button>
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default Editor;

interface Props {
  place: string;
}
