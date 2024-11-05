import { FormEvent } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useNotesContext } from "@/Context/NotesContext";
import { Checkbox } from "../ui/checkbox";
import { performNewFolder } from "@/Context/helpers";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const AddFolder = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFolderInfo = performNewFolder(event);
    console.log("🚀 ~ handleSubmit ~ newFolderInfo:", newFolderInfo);
  };

  return (
    <Sheet>
      <SheetTrigger type="button">Add folder</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new folder</SheetTitle>
          <SheetDescription />
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-3 items-start"
          >
            <Label>Folder name</Label>
            <Input
              placeholder="enter folder name.."
              name="folder_name"
              required
            />
            <UserNotesList />

            <Button type="submit">Create</Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddFolder;

const UserNotesList = () => {
  const { userNotes } = useNotesContext() as Context;

  if (!userNotes || userNotes.length < 1) {
    return null;
  }

  const content = userNotes.map((note) => <UserNote key={note.id} {...note} />);

  return (
    <>
      <Label className="text-sm font-medium leading-none">Notes</Label>
      <ScrollArea className="h-72 w-56 rounded-md border p-2">
        <div className="flex flex-col p-4 pt-0 pl-0">{content}</div>
      </ScrollArea>
    </>
  );
};

const UserNote = ({ id, note }: UserNotes) => {
  const title = note.split("\n")[0].replaceAll("#", "").trim();

  return (
    <>
      <Label>
        {title}
        <Checkbox id={id} name={title} value={id} />
      </Label>
      <Separator className="my-2" />
    </>
  );
};
