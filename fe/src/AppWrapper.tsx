import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import Editor from "./components/Editor/Editor";
import { NotesProvider } from "./Context/NotesContext";
import Notes from "./components/Notes/Notes";
import NotePreview from "./components/Notes/NotePreview";
import Account from "./components/Account/Account";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainRoute } from "./helpers/loaders";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => mainRoute(),
  },
  {
    path: "/account",
    element: <Layout />,
    children: [{ path: "", element: <Account /> }],
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
    <QueryClientProvider client={queryClient}>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
