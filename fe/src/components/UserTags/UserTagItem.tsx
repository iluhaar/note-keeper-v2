import { FC } from "react";
import EditTag from "./EditTag";
import Tag from "../Tag/Tag";

export const UserTagItem: FC<Tag> = ({ id, label, color }) => {
  return (
    <div
      className="flex flex-col flex-1 basis-1/3 items-left shadow-sm p-4 rounded-sm dark:bg-slate-800 dark:text-white sm:max-w-[45%] sm:gap-y-2 sm:min-h-[7rem]"
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
};
