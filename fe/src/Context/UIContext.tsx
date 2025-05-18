import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export const UIContext = createContext<UIContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUIContext = () => useContext(UIContext) as UIContextType;

export const UIProvider = ({ children }: Props) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [theme, setTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isDarkTheme = JSON.parse(
      localStorage.getItem("dark-theme") ?? "false"
    );

    toggleTheme(isDarkTheme);
  }, []);

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  const toggleTheme = (status: boolean) => {
    if (status) {
      setTheme(status);

      localStorage.setItem("dark-theme", "true");
      return document.documentElement.classList.add("dark");
    }

    setTheme(status);
    localStorage.setItem("dark-theme", "false");
    return document.documentElement.classList.remove("dark");
  };

  return (
    <UIContext.Provider
      value={{
        showNavbar,
        toggleNavbar,
        theme,
        toggleTheme,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}

interface UIContextType {
  showNavbar: boolean;
  toggleNavbar: () => void;
  theme: boolean;
  toggleTheme: (arg: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}
