import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import Layout from "./Layout";
import Editor from "./components/Editor/Editor";
import { NotesProvider } from "./Context/NotesContext";
import Notes from "./components/Notes/Notes";
import NotePreview from "./components/Notes/NotePreview";
import Account from "./components/Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Layout />,
    children: [{ path: "", element: <Account /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/editor",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Editor place="editor" />,
      },
      {
        path: "/editor:id",
        element: <Editor place="editor" />,
      },
    ],
  },
  {
    path: "/notes",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Notes />,
      },
      {
        path: "/notes:id",
        element: <NotePreview />,
      },
    ],
  },
]);

const AppWrapper = () => {
  return (
    <NotesProvider notes={[]}>
      <RouterProvider router={router} />
    </NotesProvider>
  );
};

export default AppWrapper;
