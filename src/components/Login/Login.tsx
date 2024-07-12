import { FormEvent } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";

const Login = () => {
  const { logIn } = useNotesContext() as Context;

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    await logIn(form.email.value, form.password.value, form.name.value);

    await navigate("/editor");

    document.title = `${form.name.value} ${document.title}`;
  };

  return (
    <>
      <form className="login-wrapper" onSubmit={(e) => handleSubmit(e)}>
        <>
          <label htmlFor="name"> Name:</label>
          <input name="name" type="text" required autoFocus />
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" required />
        </>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
