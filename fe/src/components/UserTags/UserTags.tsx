import { useNotesContext } from "@/Context/NotesContext";

import Tag from "../Tag/Tag";
import EditTag from "./EditTag";
import AddTag from "./AddTag";

const UserTags = () => {
  const { userTags } = useNotesContext() as Context;

  if (!userTags) return null;

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row gap-2 mt-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-left sm:pl-0">
        {Object.values(userTags) && Object.values(userTags).length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.values(userTags).map(({ id, label, color }: any) => {
            return (
              <div
                className="flex flex-col flex-1 basis-1/3 items-left shadow-sm p-2 rounded-sm dark:bg-slate-800 dark:text-white sm:max-w-[45%] sm:gap-y-2 sm:min-h-[7rem]"
                key={id}
              >
                <>
                  <div className="flex flex-row items-center gap-2 justify-between">
                    <div className="flex flex-row gap-x-2 items-center">
                      <h2>Tag label:</h2>
                      <span>{label}</span>
                    </div>
                    <EditTag id={id} label={label} color={color} />
                  </div>
                  <span>
                    Preview: <Tag label={label} color={color} />
                  </span>
                </>
              </div>
            );
          })
        ) : (
          <h2>You have no tags</h2>
        )}
      </div>
      <AddTag />
    </div>
  );
};

export default UserTags;
