interface UserNotes {
  id: number | string;
  note: string;
}

interface UserData {
  email: string;
  password: string;
  name: string;
}

interface Context {
  userNotes: UserNotes[] | [];
  addNote: (note: string) => void;
  isLoggedIn: boolean;
  logIn: (email: string, password: string, name: string) => void;
  logOut: () => void;
  userData: UserData | undefined;
  searchInNotes: (input: string) => UserNotes[];
  deleteNote: (id: string) => Promise;
  editNote: (id: string, value: string) => void;
  theme: boolean;
  toggleTheme: (arg: boolean) => void;
}
