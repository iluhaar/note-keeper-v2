interface UserNotes {
  id: number;
  note: string;
}

interface UserData {
  email: string;
  password: string;
  name: string;
}

interface Context {
  userNotes: UserNotes[];
  addNote: (note: string) => void;
  isLoggedIn: boolean;
  logIn: (email: string, password: string, name: string) => void;
  logOut: () => void;
  userData: UserData | undefined;
}
