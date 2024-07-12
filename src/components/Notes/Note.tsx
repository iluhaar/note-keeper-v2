import { Link } from "react-router-dom";

const Note = ({ note, id }: UserNotes) => {
  const title = note.split("\n")[0].replace("#", "");
  const content = note.split("\n").slice(1).join("\n");

  return (
    <div style={{ border: "1px solid black" }} className="note">
      <h2>
        <Link to={`${id}`}>{title}</Link>
      </h2>
      <span>{content}</span>
    </div>
  );
};

export default Note;
