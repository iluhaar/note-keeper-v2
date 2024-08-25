import { useState } from "react";

import TagForm from "./TagForm";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useNotesContext } from "@/Context/NotesContext";

const EditTag = (props: Tag) => {
  const { editTag, deleteTag } = useNotesContext() as Context;

  const [tagName, setTagName] = useState(props.label);
  const [tagColor, setTagColor] = useState(props.color);

  const handleSave = () => {
    editTag({ label: tagName, color: tagColor, id: props.id });
  };

  const handleDelete = () => {
    deleteTag(props.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Tag</Button>
      </DialogTrigger>

      <TagForm
        tagName={tagName}
        setTagName={setTagName}
        tagColor={tagColor}
        setTagColor={setTagColor}
        handleSave={handleSave}
        handleDelete={handleDelete}
        isEditing={true}
      />
    </Dialog>
  );
};

export default EditTag;
