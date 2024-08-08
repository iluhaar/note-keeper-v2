import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import Editor from "./components/Editor/Editor";
import { NotesProvider } from "./Context/NotesContext";
import Notes from "./components/Notes/Notes";
import NotePreview from "./components/Notes/NotePreview";

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
]);

const AppWrapper = () => {
  return (
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  );
};

export default AppWrapper;
