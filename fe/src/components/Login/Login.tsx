import { FormEvent, useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useConvexContext } from "@/Context/ConvexContext";
import AuthForm from "./Form";

export function Login() {
  const [progress, setProgress] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [error, setIsError] = useState<string | null>(null);

  const { logIn, registerUser, updatePassword, setIsLoggedIn } =
    useConvexContext();

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(null); // Clear any previous errors

    const form = e.target as HTMLFormElement;

    if (isResetPassword) {
      setTimeout(() => setProgress(25), 300);

      const data = await updatePassword(
        form.email.value,
        form.newPassword.value
      );
      if (data.success) {
        setTimeout(() => setProgress(65), 300);
        return setTimeout(() => {
          setProgress(100);
          setIsResetPassword(false);
          setIsLogin(true);
          setProgress(0);
          // Clear form
          form.email.value = "";
          form.newPassword.value = "";
        }, 700);
      }

      setTimeout(() => setProgress(0), 300);
      setIsError(data.error);
    } else if (isLogin) {
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

  const handleFromType = () => {
    setIsLogin((prev) => !prev);
    setIsResetPassword(false);
    setIsError(null);
  };

  const handleResetPassword = () => {
    setIsResetPassword(true);
    setIsLogin(false);
    setIsError(null);
  };

  const handleBackToLogin = () => {
    setIsResetPassword(false);
    setIsLogin(true);
    setIsError(null);
  };

  const description = isResetPassword
    ? "Enter your email and new password to reset your password."
    : isLogin
    ? "Fill the form and click save when you're done."
    : "Fill the form and click save when you're done.";

  const title = isResetPassword
    ? "Reset Password"
    : isLogin
    ? "Login"
    : "Register";

  const footerText = isResetPassword
    ? "Back to login"
    : isLogin
    ? "Not member yet?"
    : "Already have an account?";

  const buttonText = isResetPassword
    ? "Reset Password"
    : isLogin
    ? "Login"
    : "Register";

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
        isResetPassword={isResetPassword}
        title={title}
        description={description}
        handleFormType={handleFromType}
        handleResetPassword={handleResetPassword}
        handleBackToLogin={handleBackToLogin}
        footerText={footerText}
        error={error}
      />
    </Dialog>
  );
}
