interface UserNotes {
  id: string;
  note: string;
}

interface UserData {
  email: string;
  password: string;
  name: string;
  id: string;
}

interface Context {
  userNotes: UserNotes[] | [];
  addNote: (note: string) => void;
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
  editNote: (id: string, value: string) => void;
  theme: boolean;
  toggleTheme: (arg: boolean) => void;
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
}
