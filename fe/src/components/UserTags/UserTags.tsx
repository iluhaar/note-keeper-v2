import { useNotesContext } from "@/Context/NotesContext";

import AddTag from "./AddTag";
import { UserTagItem } from "./UserTagItem";

const UserTags = () => {
  const { userTags } = useNotesContext() as Context;

  if (!userTags) return null;

  const userTagsArray = Object.values(userTags) as Tag[];

  if (!userTagsArray || userTagsArray.length < 1) {
    return <h2>You have no tags</h2>;
  }

  const content = userTagsArray.map(({ id, label, color }) => {
    return <UserTagItem key={id} id={id} label={label} color={color} />;
  });

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row gap-2 mt-2 pl-5 flex-wrap pb-4 items-left content-left sm:content-start sm:items-left sm:pl-0">
        {content}
      </div>
      <AddTag />
    </div>
  );
};

export default UserTags;
