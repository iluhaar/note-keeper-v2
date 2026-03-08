import MDEditor, { commands } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useConvexContext } from "../../Context/ConvexContext";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useUIContext } from "@/Context/UIContext";
// import { AddNoteTags } from "../NoteTags/AddTag";
import { UIContext, UserNotes } from "@/types/types";

// const Tags = {
//   name: "Tags",
//   keyCommand: "tags",
//   buttonProps: { "aria-label": "Tags" },
//   icon: (
//     <>
//       <AddNoteTags />
//     </>
//   ),
// };

const Editor = ({ place }: Props) => {
  const { id } = useParams();

  const { addNote, userNotes, editNote } = useConvexContext();

  const { theme } = useUIContext() as UIContext;

  const [value, setValue] = useState<string | undefined>("");
  const [tags] = useState([]);

  const handleSave = async (value: string) => {
    if (id) {
      const note = userNotes.find((note: UserNotes) => note._id === id);
      if (note) {
        await editNote(note._id, value, note.tags || []);
        return toast("Note has been edited");
      }
    }

    await addNote(value, tags);
    return toast("Note has been saved");
  };

  const handleClear = () => {
    setValue("");
  };

  useEffect(() => {
    if (id !== undefined) {
      const note = userNotes.find((note: UserNotes) => note._id === id);
      setValue(note?.note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userNotes]);

  return (
    <div className="flex flex-col items-center justify-center sm:w-full h-full pt-4 sm:max-w-50 sm:pt-0 sm:items-start sm:justify-start">
      <MDEditor
        data-color-mode={theme ? "dark" : "light"}
        value={value}
        className="w-[90%] sm:w-full !h-[75vh] sm:!h-[90vh]"
        onChange={setValue}
        visibleDragbar={false}
        commands={[...commands.getCommands(), commands.divider]}
      />

      {place !== "home" && (
        <div className="flex flex-row py-3 gap-2">
          <Button
            disabled={value === "" || value === undefined}
            onClick={() => {
              if (value === undefined) return;
              handleSave(value);
            }}
          >
            {id ? "Edit" : "Save"}
          </Button>
          <Button onClick={handleClear}>Clear</Button>
        </div>
      )}
    </div>
  );
};

export default Editor;

interface Props {
  place: string;
}
