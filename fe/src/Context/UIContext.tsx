import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

export const UIContext = createContext<UIContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUIContext = () => useContext(UIContext) as UIContext;

export const UIProvider = ({ children }: Props) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [theme, setTheme] = useState(false);

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
      value={{ showNavbar, toggleNavbar, theme, toggleTheme }}
    >
      {children}
    </UIContext.Provider>
  );
};

interface Props {
  children: ReactElement;
}
