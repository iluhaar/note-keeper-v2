import { useLoaderData, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { Login } from "./components/Login/Login";
import MDEditor from "@uiw/react-md-editor";

function App() {
  const navigate = useNavigate();

  const { isLoggedIn, theme } = useLoaderData() as Context;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/editor");
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col h-full gap-3">
      <main className="h-[45vh] flex flex-col items-center justify-center content-center border-dashed border-2 border-red-400 dark:border-red-700 mt-5">
        <h1>Hello, Friend</h1>
        <p>Do not hesitate login and test the editor</p>
      </main>
      <section className="flex flex-col items-center justify-center">
        <MDEditor
          data-color-mode={theme ? "dark" : "light"}
          preview="preview"
          value="# Hello World"
          height="35vh"
          visibleDragbar={false}
        />

        <div className="w-80 px-5 py-2 rounded-sm shadow-sm bg-slate-400 my-2">
          <p className="text-left">
            To take more notes and sync them at your others devices{" "}
            <span className=" text-slate-50" role="button">
              <Login />
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
