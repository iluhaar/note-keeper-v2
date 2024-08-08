import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { v4 as uuid } from "uuid";

import { updateNotes, getNotes, removeNote } from "../helpers/notes";

import { registerUser as createUser, loginUser } from "../helpers/auth";

export const NotesContext = createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => useContext(NotesContext) as Context;

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (userData) {
      getNotes(userData.id).then((data) => {
        if (!data) return;
        setUserNotes(data);
      });
    }
  }, [userData]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : undefined;
    if (user !== null) {
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

  const logIn = async (email: string, password: string) => {
    return await loginUser(email, password);
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    return await createUser(email, password, name);
  };

  const addNote = async (note: string) => {
    let title = "";
    const firstWord = note
      .split("\n")[0]
      .replaceAll("#", "")
      .trim()
      .split(" ")[0];
    const secondWord = note
      .split("\n")[0]
      .replaceAll("#", "")
      .trim()
      .split(" ")[1];

    if (secondWord !== undefined) {
      title = `${firstWord}-${secondWord}`;
    } else {
      title = firstWord;
    }

    const id = `${title}-${uuid()}`;
    const updatedNotes = [{ id: id, note }, ...userNotes];

    if (userData) {
      updateNotes(updatedNotes, userData?.id, userData?.email)
        .then((res) => res.json())
        .then(() => {
          return setUserNotes(updatedNotes);
        });
    }
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    if (userData) {
      await removeNote(updatedNotes, userData.id);
      return setUserNotes(updatedNotes);
    }
  };

  const searchInNotes = (input: string) => {
    const keyWord = input.toLocaleLowerCase();

    return userNotes.filter((note: UserNotes) =>
      note.note.toLocaleLowerCase().includes(keyWord)
    );
  };

  const editNote = async (id: string, value: string) => {
    const updatedNotes = userNotes.map((note: UserNotes) => {
      if (note.id === id) {
        return { ...note, note: value };
      }
      return note;
    });
    if (userData) {
      updateNotes(updatedNotes, userData?.id, userData?.email)
        .then((res) => res.json())
        .then(() => {
          return setUserNotes(updatedNotes);
        });
    }
  };

  const toggleTheme = (status: boolean) => {
    if (status) {
      setTheme(true);
      return document.documentElement.classList.add("dark");
    }

    setTheme(false);
    return document.documentElement.classList.remove("dark");
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
        editNote,
        theme,
        toggleTheme,
        registerUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}
