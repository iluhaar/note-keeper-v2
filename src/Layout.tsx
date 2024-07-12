import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="layout--wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
