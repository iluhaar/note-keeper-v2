import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Context, Tag, UserData, UserNotes } from "@/types/types";

const ConvexContext = createContext<Context | null>(null);

export const useConvexContext = () => useContext(ConvexContext) as Context;

export const ConvexProvider = ({ children }: { children: ReactElement }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState<{ value: string; type: string | null }>({
    value: "",
    type: null,
  });

  // Convex queries
  const notes = useQuery(
    api.notes.getNotes,
    userData?._id ? { userId: userData._id } : "skip"
  );

  // Convex mutations
  const createNote = useMutation(api.notes.createNote);
  const updateNote = useMutation(api.notes.updateNote);
  const deleteNoteMutation = useMutation(api.notes.deleteNote);
  const createUser = useMutation(api.users.createUser);
  const authenticateUser = useMutation(api.users.authenticateUser);
  const updatePasswordMutation = useMutation(api.users.updatePassword);
  const updateUserTags = useMutation(api.users.updateUserTags);

  // Load user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Update document title when user changes
  useEffect(() => {
    if (userData && !document.title.includes(userData.name)) {
      document.title = `${userData.name} ${document.title}`;
    }
  }, [userData]);

  const addNote = async (note: string, tags: Tag[]) => {
    if (!userData?._id) return;

    await createNote({
      userId: userData._id,
      note,
      tags,
    });
  };

  const editNote = async (noteId: Id<"notes">, note: string, tags: Tag[]) => {
    await updateNote({
      noteId,
      note,
      tags,
    });
  };

  const deleteNote = async (noteId: Id<"notes">) => {
    await deleteNoteMutation({ noteId });
  };

  const addTag = async (label: string, color: string) => {
    if (!userData?._id) return;

    const newTag: Tag = {
      label,
      color,
      id: `${label}-${Date.now()}`,
    };

    const updatedTags: Record<string, Tag> = {
      ...userData.tags,
      [newTag.id]: newTag,
    };

    await updateUserTags({
      userId: userData._id,
      tags: updatedTags,
    });

    // Update local state
    setUserData({
      ...userData,
      tags: updatedTags,
    });

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        tags: updatedTags,
      })
    );
  };

  const editTag = async (tag: Tag) => {
    if (!userData?._id) return;

    const updatedTags: Record<string, Tag> = {
      ...userData.tags,
      [tag.id]: tag,
    };

    await updateUserTags({
      userId: userData._id,
      tags: updatedTags,
    });

    // Update local state
    setUserData({
      ...userData,
      tags: updatedTags,
    });

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        tags: updatedTags,
      })
    );
  };

  const deleteTag = async (tagId: string) => {
    if (!userData?._id) return;

    const updatedTags: Record<string, Tag> = { ...userData.tags };
    delete updatedTags[tagId];

    await updateUserTags({
      userId: userData._id,
      tags: updatedTags,
    });

    // Update local state
    setUserData({
      ...userData,
      tags: updatedTags,
    });

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        tags: updatedTags,
      })
    );
  };

  const logIn = async (email: string, password: string) => {
    try {
      const user = await authenticateUser({ email, password });

      // Convert Convex user to UserData format
      const userData: UserData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        tags: user.tags || {},
      };

      setUserData(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, data: userData, error: null };
    } catch (error) {
      // Provide user-friendly error messages
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        if (error.message.includes("User not found")) {
          errorMessage = "No account found with this email address";
        } else if (error.message.includes("Invalid password")) {
          errorMessage = "Incorrect password";
        }
      }

      return {
        success: false,
        error: errorMessage,
        data: {} as UserData,
      };
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("user");
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const userId = await createUser({
        name,
        email,
        password,
        tags: {},
      });

      // Create user data object for local storage
      const userData: UserData = {
        _id: userId,
        name,
        email,
        password,
        tags: {},
      };

      setUserData(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, data: userData, error: null };
    } catch (error) {
      // Provide user-friendly error messages
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        if (error.message.includes("User already exists")) {
          errorMessage = "An account with this email already exists";
        } else if (error.message.includes("User not found")) {
          errorMessage = "No account found with this email address";
        }
      }

      return {
        success: false,
        error: errorMessage,
        data: {} as UserData,
      };
    }
  };

  const updatePassword = async (email: string, newPassword: string) => {
    try {
      const result = await updatePasswordMutation({ email, newPassword });
      return {
        success: true,
        error: null,
        message: result.message,
      };
    } catch (error) {
      // Provide user-friendly error messages
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        if (error.message === "User not found") {
          errorMessage = "No account found with this email address";
        } else {
          errorMessage = error.message;
        }
      }

      return {
        success: false,
        error: errorMessage,
        message: "",
      };
    }
  };

  const searchInNotes = (input: string): UserNotes[] => {
    if (!notes) return [];

    const keyword = input.toLowerCase();
    return notes.filter((note) => note.note.toLowerCase().includes(keyword));
  };

  const resolveNotesList = (): UserNotes[] => {
    if (!notes) return [];
    if (filter.value === "") return notes;

    if (filter.type === "tag") {
      return notes.filter((note) =>
        note.tags.some((tag) => tag.label === filter.value)
      );
    }

    return notes.filter((note) => note.note.includes(filter.value));
  };

  return (
    <ConvexContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        userNotes: resolveNotesList(),
        addNote,
        editNote,
        deleteNote,
        userTags: userData?.tags || {},
        addTag,
        editTag,
        deleteTag,
        logIn,
        logOut,
        registerUser,
        updatePassword,
        searchInNotes,
        setFilter,
      }}
    >
      {children}
    </ConvexContext.Provider>
  );
};
