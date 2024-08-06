import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import { useNotesContext } from "@/Context/NotesContext";

export function Login() {
  const [progress, setProgress] = useState(0);

  const { logIn } = useNotesContext() as Context;

  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    logIn(form.email.value, form.password.value, form.user_name.value);

    setTimeout(() => setProgress(66), 500);
    setTimeout(() => {
      setProgress(100);
      navigate("/editor");
    }, 700);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer underline px-2">Login</span>
      </DialogTrigger>
      <DialogContent className="w-[400px] sm:max-w-[425px] text-left">
        <DialogHeader>
          <DialogTitle className="text-left">Login</DialogTitle>
          <DialogDescription className="text-left">
            Fill the form and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <form
            className="flex flex-col text-left gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <>
              <Label htmlFor="name"> Name:</Label>
              <Input name="user_name" type="text" required autoFocus />
              <Label htmlFor="email">Email:</Label>
              <Input name="email" type="email" required />
              <Label htmlFor="password">Password:</Label>
              <Input name="password" type="password" required />
            </>
            <DialogFooter className="pt-3">
              {progress > 0 ? (
                <Progress value={progress} className="w-[60%]" />
              ) : (
                <Button type="submit">Login</Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
