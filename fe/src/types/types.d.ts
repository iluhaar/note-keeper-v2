interface UserNotes {
  id: string;
  note: string;
  tags: Tag[];
}

interface Tag {
  color: string;
  label: string;
}

interface UserData {
  email: string;
  password: string;
  name: string;
  id: string;
}

interface Context {
  userNotes: UserNotes[] | [];
  addNote: (note: string, tags: Tag[] | []) => void;
  isLoggedIn: boolean;
  logIn: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: null | any;
    data: UserData;
  }>;
  logOut: () => void;
  userData: UserData | undefined | null;
  searchInNotes: (input: string) => UserNotes[];
  deleteNote: (id: string) => Promise;
  editNote: (id: string, value: string, tags: Tag[]) => void;
  registerUser: (
    arg1: string,
    arg2: string,
    arg3: string
  ) => Promise<{
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: null | any;
    data: UserData;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsLoggedIn: (arg: boolean) => void;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userTags: any;
  addTag: (arg1: string, arg2: string) => void;
  editTag: (arg: Tag) => void;
  deleteTag: (arg: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilter: ({ value: string, type: string }) => any;
}

interface UIContext {
  showNavbar: boolean;
  toggleNavbar: () => void;
  theme: boolean;
  toggleTheme: (arg: boolean) => void;
}


interface Icon {
  img: "account" | "editor" | "notes" | "logout" | "tags";
  onClick?: () => void;
}

interface UserTags {
  [key: string]: Tag;
}
interface Tag {
  label: string;
  color: string;
  id: string
}
