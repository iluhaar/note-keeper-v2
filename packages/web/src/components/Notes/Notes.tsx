import { UserNotes } from "@/types/types";
import { useConvexContext } from "../../Context/ConvexContext";
import Note from "./Note";

const Notes = () => {
  const { userNotes } = useConvexContext();

  if (!userNotes || userNotes.length < 1) {
    return <h2>No notes yet</h2>;
  }

  const content = userNotes.map(({ note, _id, tags }: UserNotes) => {
    return (
      <div className="flex flex-col" key={_id}>
        <Note note={note} id={_id} tags={tags} />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-row gap-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-stretch sm:pl-0 mt-2 sm:mt-0">
        {content}
      </div>
    </>
  );
};

export default Notes;
