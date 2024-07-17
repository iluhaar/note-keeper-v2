import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Editor from "./components/Editor/Editor";
import { useEffect } from "react";
import { useNotesContext } from "./Context/NotesContext";

function App() {
  const navigate = useNavigate();
  const { isLoggedIn } = useNotesContext() as Context;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/editor");
    }
  }, [isLoggedIn]);

  return (
    <>
      <main className="wrapper">
        <h1>Hello, Friend</h1>
        <p>Do not hesitate and go test the editor down below</p>
      </main>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          height: "30vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Editor place="home" />

        <p>
          To take more notes and sync them at your others devices{" "}
          <Link to={"/login"}>
            <span style={{ textDecoration: "underline" }}>LOGIN</span>
          </Link>
        </p>
      </section>
    </>
  );
}

export default App;
