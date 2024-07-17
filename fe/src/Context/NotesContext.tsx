import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { v4 as uuid } from "uuid";

export const NotesContext = createContext<Context | null>(null);

export const useNotesContext = () => useContext(NotesContext);

const getNotes = async () => {
  try {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(error);
  }
};

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // const userNotes = localStorage.getItem("userNotes");
    // if (userNotes) {
    //   setUserNotes(JSON.parse(userNotes));
    // }

    getNotes().then((notes) => {
      setUserNotes(notes);
    });
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : undefined;
    if (user) {
      setIsLoggedIn(true);
      setUserData(parsedUser);
      document.title = `${parsedUser.name} ${document.title}`;
    }
  }, []);

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const logIn = (email: string, password: string, name: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ email, password, name }));
  };

  const addNote = (note: string) => {
    const title = note.split("\n")[0].replace("#", "").trim().split(" ")[0];

    const id = `${title}-${uuid()}`;
    setUserNotes([...userNotes, { note, id: id }]);

    localStorage.setItem(
      "userNotes",
      JSON.stringify([...userNotes, { note, id: id }])
    );
  };

  const deleteNote = (id: number) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    setUserNotes(updatedNotes);

    localStorage.setItem("userNotes", JSON.stringify(updatedNotes));
  };

  const searchInNotes = (input: string) => {
    return userNotes.filter((note: UserNotes) => note.note.includes(input));
  };

  return (
    <NotesContext.Provider
      value={{
        userNotes,
        addNote,
        isLoggedIn,
        logIn,
        logOut,
        userData,
        searchInNotes,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}
