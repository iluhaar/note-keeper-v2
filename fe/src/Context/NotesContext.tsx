import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

import { updateNotes, getNotes } from "../helpers/notes";

export const NotesContext = createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = useQueryClient();
  //TODO try to fix the ts error
  const { data }: { data: UserNotes[] | [] } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  useEffect(() => {
    setUserNotes(data);
  }, [data]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : undefined;
    if (user) {
      setIsLoggedIn(true);
      setUserData(parsedUser);
      if (!document.title.includes(parsedUser.name)) {
        document.title = `${parsedUser.name} ${document.title}`;
      }
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
    const updatedNotes = [...data, { id: id, note }];

    updateNotes(updatedNotes)
      .then((res) => res.json())
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });

        setUserNotes(updatedNotes);
      });
  };

  const deleteNote = (id: string) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    // setUserNotes(updatedNotes);

    updateNotes(updatedNotes).then(() =>
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    );
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
