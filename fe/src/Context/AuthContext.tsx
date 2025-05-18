import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, registerUser as createUser } from "../helpers/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext) as AuthContextType;

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userTags, setUserTags] = useState<UserTags>({});

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

  const logIn = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data.success && data.data) {
      setUserData(data.data);
      setUserTags(data.data.tags);
    }
    return data;
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    return await createUser(email, password, name);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUserTags({});
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        userTags,
        setUserTags,
        logIn,
        logOut,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthResponse {
  success: boolean;
  error: null | string | unknown;
  data: unknown;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userTags: UserTags;
  setUserTags: (tags: UserTags) => void;
  logIn: (email: string, password: string) => Promise<AuthResponse>;
  logOut: () => void;
  registerUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResponse>;
}
