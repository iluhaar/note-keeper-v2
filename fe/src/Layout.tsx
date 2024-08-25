import { Outlet } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import NavBar from "./components/Navbar/Navbar";
import { useNotesContext } from "./Context/NotesContext";
import Loading from "./components/Indicators/Loading";

const Layout = () => {
  const { isLoading } = useNotesContext() as Context;

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-x-10 flex-col sm:flex-row sm:pt-4 sm:h-[100dvh] sm:pb-2">
      <NavBar />
      <div className="flex w-full items-left justify-left sm:items-start sm:justify-start">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
