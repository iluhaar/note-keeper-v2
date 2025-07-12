import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import ResetPassword from "./ResetPassword";

const AuthForm = ({
  handleSubmit,
  progress,
  buttonText,
  isLogin,
  title,
  description,
  handleFormType,
  footerText,
  error,
}: Props) => {
<<<<<<< Updated upstream
  const [inputType, setInputType] = useState<"password" | "text">("password");
=======
>>>>>>> Stashed changes
  const [checked, setChecked] = useState(false);

  const inputType = checked ? "text" : "password";

  const handleShowPassword = () => {
    setChecked((prev) => !prev);
  };

  return (
    <DialogContent className="w-[450px] sm:max-w-[475px] text-left">
      <DialogHeader>
        <DialogTitle className="text-left">{title}</DialogTitle>
        <DialogDescription className="text-left">
          {description}
        </DialogDescription>
      </DialogHeader>
      <form
        className="flex flex-col text-left gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <>
          {!isLogin && (
            <>
              <Label htmlFor="name"> Name:</Label>
              <Input name="user_name" type="text" required autoFocus />
            </>
          )}
          <Label htmlFor="email">Email:</Label>
          <Input name="email" type="email" required />
<<<<<<< Updated upstream
          <Label htmlFor="password">Password:</Label>
          <Input name="password" type={inputType} required />
          <Label className="flex flex-row items-center gap-2">
            <Checkbox checked={checked} onCheckedChange={handleShowPassword} />
            Show password
          </Label>
=======
          {!isResetPassword ? (
            <>
              <Label htmlFor="password">Password:</Label>
              <Input name="password" type={inputType} required />
              <Label className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={handleShowPassword}
                />
                Show password
              </Label>
            </>
          ) : (
            <ResetPassword />
          )}
>>>>>>> Stashed changes
        </>
        {error && <span className="text-destructive">{error}</span>}
        <DialogFooter className="pt-3 flex flex-col">
          {progress > 0 ? (
            <Progress value={progress} className="w-[60%]" />
          ) : (
<<<<<<< Updated upstream
            <Button type="submit">{buttonText}</Button>
=======
            <div className="flex justify-between w-full">
              {isLogin && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetPassword}
                  className="text-sm"
                >
                  Reset Password
                </Button>
              )}

              <Button type="submit">{buttonText}</Button>
            </div>
>>>>>>> Stashed changes
          )}
        </DialogFooter>
        <span
          onClick={handleFormType}
          className="text-left underline cursor-pointer"
        >
          {footerText}
        </span>
      </form>
    </DialogContent>
  );
};

export default AuthForm;

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  progress: number;
  buttonText: string;
  isLogin: boolean;
  title: string;
  description: string;
  handleFormType: () => void;
  footerText: string;
  error: string | null;
}
