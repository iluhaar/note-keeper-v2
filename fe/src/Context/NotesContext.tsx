import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

import { updateNotes, getNotes } from "../helpers/notes";

export const NotesContext = createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //TODO try to fix the ts error
  const { data }: { data: UserNotes[] | [] } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

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

  const addNote = async (note: string) => {
    const title = note.split("\n")[0].replace("#", "").trim().split(" ")[0];

    const id = `${title}-${uuid()}`;
    const updatedNotes = [...userNotes, { id: id, note }];

    setUserNotes(updatedNotes);

    updateNotes(updatedNotes)
      .then((res) => res.json())
      .then((data) => {
        setUserNotes(data.notes);
      });
  };

  const deleteNote = (id: string) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    setUserNotes(updatedNotes);

    updateNotes(updatedNotes)
      .then((res) => res.json())
      .then((data) => {
        setUserNotes(data.notes);
      });
  };

  const searchInNotes = (input: string) => {
    return userNotes.filter((note: UserNotes) => note.note.includes(input));
  };

  return (
    <NotesContext.Provider
      value={{
        userNotes: data,
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
