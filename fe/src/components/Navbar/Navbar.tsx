import { useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useNotesContext } from "../../Context/NotesContext";
import { APP_NAME } from "@/constants";

import Account from "../Account/Account";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CommandMenu } from "../SearchBar/CommandSearch";
import { cn } from "@/lib/utils";
import Icon from "../Icon";
import { useUIContext } from "@/Context/UIContext";

const NavBar = () => {
  const { userNotes, isLoggedIn, logOut, userData } =
    useNotesContext() as Context;

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
  }, []);

  const width = showNavbar ? "sm:w-1/6" : "sm:w-[3%]";

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

  let content;
  if (userNotes?.length > 0) {
    content = (
      <ol className="hidden sm:block sm:h-[100%] list-decimal mt-2 pl-4">
        {userNotes?.map(({ note, id }: UserNotes) => {
          const noteTitle = note
            .split("\n")[0]
            .replaceAll("#", "")
            .replaceAll("*", "");

          return (
            <li key={id}>
              <NavLink to={`/editor/${id}`} className="underline">
                {noteTitle}
              </NavLink>
            </li>
          );
        })}
      </ol>
    );
  }

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
          <ul className="flex flex-row gap-2 items-center sm:block">
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to={"/editor"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    {showNavbar ? <span>Editor</span> : <Icon img="editor" />}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/notes"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    <div className="flex flex-row sm:gap-2">
                      {showNavbar ? <span>Notes</span> : <Icon img="notes" />}
                    </div>
                  </NavLink>
                  {showNavbar && <>{content}</>}
                </li>
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
          <Icon img="logout" onClick={handleLogout} />
        )}
      </CardContent>
    </Card>
  );
};

export default NavBar;
