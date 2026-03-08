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

const AuthForm = ({
  handleSubmit,
  progress,
  buttonText,
  isLogin,
  isResetPassword,
  title,
  description,
  handleFormType,
  handleResetPassword,
  handleBackToLogin,
  footerText,
  error,
  onWorkOSSignIn,
}: Props) => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [newPasswordInputType, setNewPasswordInputType] = useState<
    "password" | "text"
  >("password");
  const [checked, setChecked] = useState(false);
  const [newPasswordChecked, setNewPasswordChecked] = useState(false);

  const handleShowPassword = (status: boolean) => {
    const inputType = status ? "text" : "password";
    setInputType(inputType);
    setChecked((prev) => !prev);
  };

  const handleShowNewPassword = (status: boolean) => {
    const inputType = status ? "text" : "password";
    setNewPasswordInputType(inputType);
    setNewPasswordChecked((prev) => !prev);
  };

  return (
    <DialogContent className="w-[400px] sm:max-w-[425px] text-left">
      <DialogHeader>
        <DialogTitle className="text-left">{title}</DialogTitle>
        <DialogDescription className="text-left">
          {description}
        </DialogDescription>
      </DialogHeader>

      {/* WorkOS Sign-in Button */}
      {!isResetPassword && (
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onWorkOSSignIn}
          >
            Sign in with WorkOS
          </Button>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </div>
      )}

      <form
        className="flex flex-col text-left gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <>
          {!isLogin && !isResetPassword && (
            <>
              <Label htmlFor="name"> Name:</Label>
              <Input name="user_name" type="text" required autoFocus />
            </>
          )}
          <Label htmlFor="email">Email:</Label>
          <Input name="email" type="email" required />
          {!isResetPassword && (
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
          )}
          {isResetPassword && (
            <>
              <Label htmlFor="newPassword">New Password:</Label>
              <Input name="newPassword" type={newPasswordInputType} required />
              <Label className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={newPasswordChecked}
                  onCheckedChange={handleShowNewPassword}
                />
                Show new password
              </Label>
            </>
          )}
        </>
        {error && <span className="text-destructive">{error}</span>}
        <DialogFooter className="pt-3 flex flex-col gap-2">
          {progress > 0 ? (
            <Progress value={progress} className="w-[60%]" />
          ) : (
            <>
              <Button type="submit">{buttonText}</Button>
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
            </>
          )}
        </DialogFooter>
        <span
          onClick={isResetPassword ? handleBackToLogin : handleFormType}
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
  isResetPassword: boolean;
  title: string;
  description: string;
  handleFormType: () => void;
  handleResetPassword: () => void;
  handleBackToLogin: () => void;
  footerText: string;
  error: string | null;
  onWorkOSSignIn: () => void;
}
