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
  title,
  description,
  handleFormType,
  footerText,
  error,
}: Props) => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [checked, setChecked] = useState(true);

  const handleShowPassword = (status: boolean) => {
    const inputType = status ? "password" : "text";
    setInputType(inputType);
    setChecked((prev) => !prev);
  };

  return (
    <DialogContent className="w-[400px] sm:max-w-[425px] text-left">
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
          <Label htmlFor="password">Password:</Label>
          <Input name="password" type={inputType} required />
          <Label className="flex flex-row items-center gap-2">
            <Checkbox checked={checked} onCheckedChange={handleShowPassword} />
            Show password
          </Label>
        </>
        {error && <span className="text-destructive">{error}</span>}
        <DialogFooter className="pt-3 flex flex-col">
          {progress > 0 ? (
            <Progress value={progress} className="w-[60%]" />
          ) : (
            <Button type="submit">{buttonText}</Button>
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
