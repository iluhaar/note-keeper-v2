import { FormEvent, useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "@/Context/NotesContext";
import AuthForm from "./Form";

export function Login() {
  const [progress, setProgress] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setIsError] = useState(null);

  const { logIn, registerUser, setIsLoggedIn } = useNotesContext() as Context;

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (isLogin) {
      setTimeout(() => setProgress(25), 300);

      const data = await logIn(form.email.value, form.password.value);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => setProgress(65), 300);
        return setTimeout(() => {
          setIsLoggedIn(true);
          setProgress(100);
          navigate("/editor");
        }, 700);
      }

      setTimeout(() => setProgress(0), 300);

      return setIsError(data.error);
    } else {
      setTimeout(() => setProgress(25), 300);
      const data = await registerUser(
        form.email.value,
        form.password.value,
        form.user_name.value
      );
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => setProgress(65), 300);
        return setTimeout(() => {
          setIsLoggedIn(true);
          setProgress(100);
          navigate("/editor");
        }, 700);
      }

      setTimeout(() => setProgress(0), 300);

      return setIsError(data.error);
    }
  };

  const handleFromType = () => setIsLogin((prev) => !prev);

  const description = isLogin
    ? "Fill the form and click save when you're done."
    : "Fill the form and click save when you're done.";

  const title = isLogin ? "Login" : "Register";

  const footerText = isLogin ? "Not member yet?" : "Already have an account?";

  const buttonText = isLogin ? "Login" : "Register";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer underline px-2">Login</span>
      </DialogTrigger>

      <AuthForm
        handleSubmit={handleSubmit}
        progress={progress}
        buttonText={buttonText}
        isLogin={isLogin}
        title={title}
        description={description}
        handleFormType={handleFromType}
        footerText={footerText}
        error={error}
      />
    </Dialog>
  );
}
