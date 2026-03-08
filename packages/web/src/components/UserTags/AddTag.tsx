import { useState } from "react";

import TagForm from "./TagForm";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useConvexContext } from "@/Context/ConvexContext";

const AddTag = () => {
  const { addTag } = useConvexContext();

  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");

  const handleSave = () => {
    addTag(tagName, tagColor);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Tag</Button>
      </DialogTrigger>

      <TagForm
        tagName={tagName}
        setTagName={setTagName}
        tagColor={tagColor}
        setTagColor={setTagColor}
        handleSave={handleSave}
        isEditing={false}
      />
    </Dialog>
  );
};

export default AddTag;
