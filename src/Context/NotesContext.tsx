import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export const NotesContext = createContext<Context | null>(null);

export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addNote = (note: string) => {
    setUserNotes([...userNotes, { note, id: userNotes.length + 1 }]);

    localStorage.setItem(
      "userNotes",
      JSON.stringify([...userNotes, { note, id: userNotes.length + 1 }])
    );
  };

  useEffect(() => {
    const userNotes = localStorage.getItem("userNotes");
    if (userNotes) {
      setUserNotes(JSON.parse(userNotes));
    }
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
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

  return (
    <NotesContext.Provider
      value={{ userNotes, addNote, isLoggedIn, logIn, logOut, userData }}
    >
      {children}
    </NotesContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}
