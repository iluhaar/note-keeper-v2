import { Link, useNavigate } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";

import { APP_NAME } from "../../contants";
import SearchBar from "../SearchBar/SearchBar";

const Sidebar = () => {
  const { userNotes, isLoggedIn, logOut } = useNotesContext();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOut();
    return navigate("/");
  };

  let content;
  if (userNotes?.length) {
    content = (
      <ol>
        {userNotes?.map(({ note, id }: UserNotes) => {
          const noteTitle = note.split("\n")[0].replace("#", "");

          return (
            <li key={id}>
              <Link to={`/editor/${id}`}>{noteTitle}</Link>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <nav className="sidebar">
      <h3>{APP_NAME}</h3>
      <SearchBar />
      <ul>
        <li>
          <Link to={"/account"}>Account</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to={"/editor"}>Editor</Link>
          </li>
        )}
        <Link to={""} onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </Link>
      </ul>
      {isLoggedIn && (
        <>
          <Link to={"/notes"}>Notes</Link>
          {content}
        </>
      )}
    </nav>
  );
};

export default Sidebar;
