import { NavLink, useNavigate } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";

import { APP_NAME } from "../../contants";

import Account from "../Account/Account";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CommandMenu } from "../SearchBar/CommandSearch";

const NavBar = () => {
  const { userNotes, isLoggedIn, logOut, userData } =
    useNotesContext() as Context;

  const navigate = useNavigate();

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
    <Card className="text-left dark:bg-slate-800 dark:text-white ">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          <NavLink to="/">
            <span className="py-2 font-bold">{appTitle}</span>
          </NavLink>
          <ThemeToggle />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between gap-2 sm:block">
        <div className="flex flex-row gap-2 sm:flex-col">
          <CommandMenu />
          <Sheet>
            <SheetTrigger className="text-left">Account</SheetTrigger>
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
                    Editor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/notes"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    Notes
                  </NavLink>
                  {content}
                </li>
              </>
            )}
          </ul>
        </div>
        <div
          role="button"
          className="sm:pt-2 hover:font-bold pr-3"
          onClick={handleLogout}
        >
          Logout
        </div>
      </CardContent>
    </Card>
  );
};

export default NavBar;
