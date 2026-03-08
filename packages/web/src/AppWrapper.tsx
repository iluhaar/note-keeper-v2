import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import { UIProvider } from "./Context/UIContext";

import Editor from "./components/Editor/Editor";
import Notes from "./components/Notes/Notes";
import NotePreview from "./components/Notes/NotePreview";
import UserTags from "./components/UserTags/UserTags";

import { mainRoute } from "./helpers/loaders";
import { ConvexProvider } from "./Context/ConvexContext";

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
    <UIProvider>
      <ConvexProvider>
        <RouterProvider router={router} />
      </ConvexProvider>
    </UIProvider>
  );
};

export default AppWrapper;
