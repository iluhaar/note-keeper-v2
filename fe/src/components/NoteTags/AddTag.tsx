import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { useNotesContext } from "@/Context/NotesContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

let isChanged = false;

export function AddNoteTags() {
  const { id } = useParams();

  const { userTags, userNotes, editNote } = useNotesContext() as Context;
  const findNote = userNotes.find((note: UserNotes) => note.id === id);

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<
    { label: string; color: string; id: string; selected?: boolean }[]
  >(Object.values(userTags ?? {}));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeTags = Object.values(userTags).map((tag: any) => {
      const isExists = findNote?.tags?.find((t) => t.id === tag.id);
      if (isExists) {
        return {
          ...tag,
          selected: true,
        };
      }
      return tag;
    });

    setTags(activeTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = () => {
    if (!id || !findNote || isChanged === false) return;

    const filterSelectedTags = tags.filter((tag) => tag.selected);

    editNote(id, findNote.note, filterSelectedTags);
    isChanged = false;
  };

  const handleOpenChange = () => {
    setOpen((prev) => {
      if (prev) {
        handleSave();
      }

      return !prev;
    });
  };

  const handleSelect = (value: string) => {
    setTags((prevTags) => {
      const updatedTags = prevTags.map((tag) => {
        if (tag.label === value) {
          return { ...tag, selected: !tag.selected };
        }
        return tag;
      });
      isChanged = true;
      return updatedTags;
    });
  };

  return (
    <div className="flex w-full flex-col items-start justify-between p-0 h-fit sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <span className="p-0 h-fit">
            <DotsHorizontalIcon />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Apply tag</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Filter tag..."
                  autoFocus={true}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No tag found.</CommandEmpty>
                  <CommandGroup>
                    {tags.map(({ id, label, selected }) => (
                      <CommandItem
                        key={id}
                        value={label}
                        onSelect={(value: string) => handleSelect(value)}
                        selected={selected}
                      >
                        {label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
