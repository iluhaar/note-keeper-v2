import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ColorSelect } from "./ColorSelect";
import { Button } from "../ui/button";

const TagForm = ({
  tagName,
  setTagName,
  tagColor,
  setTagColor,
  handleSave,
  handleDelete,
  isEditing,
}: Props) => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {isEditing ? (
            <DialogTitle>Edit Tag</DialogTitle>
          ) : (
            <DialogTitle>Create Tag</DialogTitle>
          )}
          {isEditing ? (
            <DialogDescription>
              Make changes to your Tag here. Click save when you're done.
            </DialogDescription>
          ) : (
            <DialogDescription>
              Add name and color to your tag. Click save when you're done.
            </DialogDescription>
          )}
        </DialogHeader>{" "}
        <Input
          type="text"
          name="label"
          id="label"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <div className="flex flex-row items-center">
          <ColorSelect handleColor={setTagColor} />
          <svg width="50" height="50">
            <circle
              cx="25"
              cy="25"
              r="15"
              stroke="black"
              strokeWidth="2"
              fill={`${tagColor}`}
            />
          </svg>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogClose>
          {isEditing && (
            <DialogClose asChild>
              <Button onClick={handleDelete} variant="secondary">
                Delete
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default TagForm;

interface Props {
  tagName: string;
  setTagName: (arg: string) => void;
  tagColor: string;
  setTagColor: (arg: string) => void;
  handleSave: () => void;
  handleDelete?: () => void;
  isEditing: boolean;
}
