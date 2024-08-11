import { useNotesContext } from "../../Context/NotesContext";
import Tag from "../Tag/Tag";
import Note from "./Note";

const Notes = () => {
  const { userNotes } = useNotesContext() as Context;

  if (!userNotes) return null;
  return (
    <>
      <div className="flex flex-row gap-2 mt-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-start sm:pl-0">
        {userNotes && userNotes.length > 0 ? (
          userNotes.map(({ note, id, tags }: UserNotes) => {
            return (
              <div className="flex flex-col">
                {tags && tags.length > 0 && (
                  <div
                    className="flex flex-row flex-wrap max-w-[180px] sm:max-w-[174px]"
                    key={id}
                  >
                    {tags.map((tag) => (
                      <Tag
                        key={tag.label}
                        label={tag.label}
                        color={tag.color}
                      />
                    ))}
                  </div>
                )}
                <Note key={id} note={note} id={id} />
              </div>
            );
          })
        ) : (
          <h2>No notes yet</h2>
        )}
      </div>
    </>
  );
};

export default Notes;
