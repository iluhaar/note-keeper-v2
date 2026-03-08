import { Id } from "../../convex/_generated/dataModel";

interface UserNotes {
  _id: Id<"notes">;
  userId: Id<"users">;
  note: string;
  tags: Tag[];
  createdAt: number;
  updatedAt: number;
}

interface Tag {
  color: string;
  label: string;
  id: string;
}

interface UserData {
  _id: Id<"users">;
  email: string;
  name: string;
  password?: string;
  tags: Record<string, Tag>;
}

interface Context {
  userNotes: UserNotes[] | [];
  addNote: (note: string, tags: Tag[] | []) => Promise<void>;
  isLoggedIn: boolean;
  logIn: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    error: null | string;
    data: UserData;
  }>;
  logOut: () => void;
  workOSSignIn: () => void;
  isWorkOSAuthenticated: boolean;
  searchInNotes: (input: string) => UserNotes[];
  deleteNote: (id: Id<"notes">) => Promise<void>;
  editNote: (id: Id<"notes">, value: string, tags: Tag[]) => Promise<void>;
  registerUser: (
    arg1: string,
    arg2: string,
    arg3: string
  ) => Promise<{
    success: boolean;
    error: null | string;
    data: UserData;
  }>;
  updatePassword: (
    email: string,
    newPassword: string
  ) => Promise<{
    success: boolean;
    error: null | string;
    message: string;
  }>;
  addTag: (arg1: string, arg2: string) => Promise<void>;
  editTag: (arg: Tag) => Promise<void>;
  deleteTag: (arg: string) => Promise<void>;
  setFilter: ({ value, type }: { value: string; type: string | null }) => void;
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
  setIsLoggedIn: (val: boolean) => void;
  userTags: Record<string, Tag>;
}

interface UIContext {
  showNavbar: boolean;
  toggleNavbar: () => void;
  theme: boolean;
  toggleTheme: (arg: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

interface Icon {
  img: "account" | "editor" | "notes" | "logout" | "tags";
  onClick?: void;
}

interface UserTags {
  [key: string]: Tag;
}
