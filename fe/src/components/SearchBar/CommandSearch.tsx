import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { useNotesContext } from "@/Context/NotesContext";

export function CommandMenu() {
  const { userNotes } = useNotesContext() as Context;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <div className="p-1 shadow-sm cursor-pointer hover:bg-slate-100 rounded-sm dark:bg-slate-600 dark:hover:bg-slate-700 dark:hover:p-2">
        <div onClick={() => setOpen(true)}>
          <svg
            className="fill-slate-500 dark:fill-slate-400"
            height="24px"
            width="24px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488.4 488.4"
          >
            <g>
              <g>
                <path
                  d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="w-[400px] sm:w-[1200px] sm:max-w-[1200px] sm:h-[540px]"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="sm:h-[540px] sm:max-h-[540px]">
          <CommandEmpty>No results found.</CommandEmpty>

          {userNotes && userNotes.length > 0 && (
            <CommandGroup heading="Notes">
              {userNotes.map((userNote: UserNotes) => {
                return (
                  <Link
                    key={userNote.id}
                    to={`/notes/${userNote.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <CommandItem
                      className="cursor-pointer"
                      value={userNote.note.split("\n")[0].replaceAll("#", "")}
                      selected={false}
                    >
                      {userNote.note.split("\n")[0].replaceAll("#", "")}
                    </CommandItem>
                  </Link>
                );
              })}
            </CommandGroup>
          )}
          <CommandGroup heading="Suggestions">
            <Link to={"/editor"} onClick={() => setOpen(false)}>
              <CommandItem className="cursor-pointer" value="Editor">
                Editor
              </CommandItem>
            </Link>

            <Link to={"/notes"} onClick={() => setOpen(false)}>
              <CommandItem className="cursor-pointer" value="Notes">
                Notes
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
