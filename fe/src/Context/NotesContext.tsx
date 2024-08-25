import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { v4 as uuid } from "uuid";

import { updateNotes, getNotes, removeNote, updateTag } from "../helpers/notes";

import { registerUser as createUser, loginUser } from "../helpers/auth";

export const NotesContext = createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => useContext(NotesContext) as Context;

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userTags, setUserTags] = useState<UserTags>({});
  const [filter, setFilter] = useState({
    value: "",
    type: null,
  });
  useEffect(() => {
    if (userData) {
      setIsLoading(true);
      getNotes(userData.id).then((data) => {
        if (!data) return;
        setUserNotes(data);
        return setIsLoading(false);
      });
    }
  }, [userData]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : undefined;
    if (user !== null) {
      setIsLoggedIn(true);
      setUserData(parsedUser);
      setUserTags(parsedUser.tags);
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
    const data = await loginUser(email, password);
    setUserData(data.data);
    setUserTags(data.data.tags);
    return data;
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    return await createUser(email, password, name);
  };

  const addNote = async (note: string, tags: Tag[] | []) => {
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
    const updatedNotes = [{ id: id, note, tags }, ...userNotes];
    if (userData) {
      setIsLoading(true);
      updateNotes(updatedNotes, userData?.id, userData?.email)
        .then((res) => res.json())
        .then(() => {
          setIsLoading(false);
          return setUserNotes(updatedNotes);
        })
        .catch((error) => console.error(error));
    }
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    if (userData) {
      setIsLoading(true);
      await removeNote(updatedNotes, userData.id);
      setIsLoading(false);
      return setUserNotes(updatedNotes);
    }
  };

  const searchInNotes = (input: string) => {
    const keyWord = input.toLocaleLowerCase();

    return userNotes.filter((note: UserNotes) =>
      note.note.toLocaleLowerCase().includes(keyWord)
    );
  };

  const editNote = async (id: string, value: string, tags: Tag[]) => {
    const updatedNotes = userNotes.map((note: UserNotes) => {
      if (note.id === id) {
        return { ...note, note: value, tags };
      }
      return note;
    });
    if (userData) {
      setIsLoading(true);

      updateNotes(updatedNotes, userData?.id, userData?.email)
        .then((res) => res.json())
        .then(() => {
          setIsLoading(false);
          return setUserNotes(updatedNotes);
        })
        .catch((error) => console.error(error));
    }
  };

  const addTag = async (label: string, color: string) => {
    const id = `${label}-${uuid()}`;

    if (!userData) return;

    userTags[id] = { label, color, id };

    updateTag(userTags, userData.id)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, tags: res.data })
        );
        setUserTags(res.data);
      })
      .catch((error) => console.error(error));
  };

  const editTag = async (tag: Tag) => {
    if (!userData) return;

    userTags[tag.id] = { ...tag, color: tag.color, label: tag.label };

    updateTag(userTags, userData.id)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, tags: res.data })
        );
        setUserTags(res.data);
      })
      .catch((error) => console.error(error));
  };

  const deleteTag = async (id: string) => {
    if (!userData) return;

    delete userTags[id];

    updateTag(userTags, userData.id)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, tags: res.data })
        );
        setUserTags(res.data);
      })
      .catch((error) => console.error(error));
  };

  const resolveNotesList = () => {
    if (filter.value === "") return userNotes;

    if (filter.type === "tag") {
      return userNotes.filter((note) =>
        note.tags.some((tag) => tag.label === filter.value)
      );
    }

    return userNotes.filter((note) => note.note.includes(filter.value));
  };

  return (
    <NotesContext.Provider
      value={{
        userNotes: resolveNotesList(),
        addNote,
        isLoggedIn,
        logIn,
        logOut,
        userData,
        searchInNotes,
        deleteNote,
        editNote,
        registerUser,
        setIsLoggedIn,
        isLoading,
        userTags,
        addTag,
        editTag,
        deleteTag,
        setFilter,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}
