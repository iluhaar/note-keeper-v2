import { useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useNotesContext } from "../../Context/NotesContext";
import { useAuthContext } from "../../Context/AuthContext";
import { APP_NAME, NAV_ITEMS } from "@/constants";

import Account from "../Account/Account";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CommandMenu } from "../SearchBar/CommandSearch";
import { cn } from "@/lib/utils";
import Icon from "../Icon";
import { useUIContext } from "@/Context/UIContext";
import { NavbarItem } from "./NavbarItem";

const Navbar = () => {
  const { isLoggedIn, logOut } = useNotesContext() as Context;
  const { userData } = useAuthContext();
  const { showNavbar, toggleNavbar } = useUIContext() as UIContext;
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleNavbar();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const width = showNavbar ? "sm:w-1/6" : "sm:w-[5%]";

  let appTitle = "";

  if (userData && userData.name) {
    appTitle = `${userData?.name}-${APP_NAME}`;
  } else {
    appTitle = `${APP_NAME}`;
  }

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <Card
      className={cn("text-left dark:bg-slate-800 dark:text-white", `${width}`)}
    >
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          {showNavbar && (
            <NavLink to="/">
              <span className="py-2 font-bold">{appTitle}</span>
            </NavLink>
          )}
          <ThemeToggle open={showNavbar} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between gap-2 sm:block">
        <div className="flex flex-row gap-2 sm:flex-col sm:gap-y-3">
          <CommandMenu />
          <Sheet>
            <SheetTrigger className="text-left">
              {showNavbar ? <span>Account</span> : <Icon img="account" />}
            </SheetTrigger>
            <SheetContent>
              <Account />
            </SheetContent>
          </Sheet>
          <ul className="flex flex-row gap-5 items-center sm:block">
            {isLoggedIn && (
              <>
                {NAV_ITEMS.map((item) => (
                  <NavbarItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                    shouldResetFilter={item.shouldResetFilter}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
        {showNavbar ? (
          <div
            role="button"
            className="sm:pt-2 hover:font-bold pr-3"
            onClick={handleLogout}
          >
            Logout
          </div>
        ) : (
          <div className="sm:pt-2">
            <Icon img="logout" onClick={handleLogout} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Navbar;
