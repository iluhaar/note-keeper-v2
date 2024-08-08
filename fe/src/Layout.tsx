import { Outlet } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import NavBar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="w-full flex gap-x-10 flex-col sm:flex-row sm:pt-4 sm:h-[100dvh] sm:pb-2">
      <NavBar />
      <div className="flex w-full items-left justify-left sm:w-5/6 sm:items-start sm:justify-start">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
