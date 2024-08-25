import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import { NotesProvider } from "./Context/NotesContext";
import { UIProvider } from "./Context/UIContext";

import Editor from "./components/Editor/Editor";
import Notes from "./components/Notes/Notes";
import NotePreview from "./components/Notes/NotePreview";
import UserTags from "./components/UserTags/UserTags";

import { mainRoute } from "./helpers/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => mainRoute(),
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
  {
    path: "/tags",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <UserTags />,
      },
    ],
  },
]);

const AppWrapper = () => {
  return (
    <NotesProvider>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </NotesProvider>
  );
};

export default AppWrapper;
