import { Outlet } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar/Navbar";
import { useUIContext } from "./Context/UIContext";
import Loading from "./components/Indicators/Loading";

const Layout = () => {
  const { isLoading } = useUIContext();

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-x-10 flex-col sm:flex-row sm:pt-4 sm:h-[100dvh] sm:pb-2">
      <Navbar />
      <div className="flex w-full items-left justify-left sm:items-start sm:justify-start">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
