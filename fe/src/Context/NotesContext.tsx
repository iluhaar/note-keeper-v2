import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

// import { updateNotes, getNotes, removeNote } from "../helpers/notes";

export const NotesContext = createContext<Context | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => useContext(NotesContext);

export const NotesProvider = ({ children }: Props) => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>(mockedNotes);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(false);

  // const queryClient = useQueryClient();
  //TODO try to fix the ts error
  // const { data }: { data: UserNotes[] | [] } = useQuery({
  //   queryKey: ["notes"],
  //   queryFn: getNotes,
  // });

  // useEffect(() => {
  //   getNotes().then((data) => {
  //     if (!data) return;
  //     setUserNotes(data);
  //   });
  // }, []);

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
    const userInfo = { email, password, name };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUserData(userInfo);
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
    }

    title = firstWord;

    const id = `${title}-${uuid()}`;
    const updatedNotes = [...userNotes, { id: id, note }];

    // updateNotes(updatedNotes)
    // .then((res) => res.json())
    // .then(() => {
    return setUserNotes(updatedNotes);
    // return queryClient.invalidateQueries({ queryKey: ["notes"] });
    // });
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = userNotes.filter((note: UserNotes) => note.id !== id);

    // removeNote("0");
    // .then((res) => res.json())
    // .then((data) => {
    return setUserNotes(updatedNotes);
    //   // queryClient.invalidateQueries({ queryKey: ["notes"] });
    //   return true;
    // });

    // return false;
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

    return setUserNotes(updatedNotes);
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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}

export const mockedNotes = [
  {
    note: "# Shopping List\n## Items:\n- Milk\n- Bread\n- Eggs\n- Cheese",
    id: "Shopping List-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Meeting Notes\n## Topics:\n- Project Update\n- Task Assignments\n- Next Steps",
    id: "Meeting Notes-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Recipe\n## Ingredients:\n- Flour\n- Sugar\n- Butter\n## Instructions:\n1. Preheat oven\n2. Mix ingredients",
    id: "Recipe-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Travel Itinerary\n## Days:\n- Day 1: Arrival\n- Day 2: Sightseeing\n- Day 3: Museum visit",
    id: "Travel Itinerary-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Book Summary\n## Chapters:\n- Introduction\n- Chapter 1\n- Chapter 2",
    id: "Book Summary-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Movie Review\n## Plot:\n- Brief summary\n## Characters:\n- Main characters\n## Review:\n- Overall opinion",
    id: "Movie Review-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Study Notes\n## Topic:\n- Subject matter\n## Key Points:\n- Important information",
    id: "Study Notes-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
  {
    note: "# Task List\n## Tasks:\n- Task 1\n- Task 2\n- Task 3",
    id: "Task List-641784f3-dc9b-4797-8a2f-b0922a225a75", // Replace with a unique ID generator
  },
];
