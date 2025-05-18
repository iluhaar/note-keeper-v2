import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthContext } from "../../Context/AuthContext";
import { Card, CardContent, CardTitle } from "../ui/card";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { memo } from "react";

const Account = memo(() => {
  const { userData } = useAuthContext();

  if (
    userData === undefined ||
    userData === null ||
    Object.keys(userData).length === 0
  )
    return null;

  return (
    <Card className="p-2 w-45 mt-3">
      <CardTitle className="px-2">Account</CardTitle>
      <CardContent className="pt-2">
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </CardContent>
    </Card>
  );
});

export default Account;
