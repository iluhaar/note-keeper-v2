import { FormEvent, useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "@/Context/NotesContext";
import AuthForm from "./Form";
import { useAuthContext } from "@/Context/AuthContext";

export function Login() {
  const [progress, setProgress] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setIsError] = useState<string | null>(null);

  const { logIn, registerUser } = useNotesContext() as Context;
  const { setIsLoggedIn } = useAuthContext();

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(null); // Clear any previous errors

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
          navigate("/notes");
        }, 700);
      }

      setTimeout(() => setProgress(0), 300);

      // Clear password field on error
      form.password.value = "";

      // Handle specific error cases
      if (data.error === "Password is incorrect") {
        setIsError("The password you entered is incorrect. Please try again.");
      } else {
        setIsError(data.error);
      }
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
          navigate("/notes");
        }, 700);
      }

      setTimeout(() => setProgress(0), 300);

      // Clear password field on error
      form.password.value = "";
      setIsError(data.error);
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
