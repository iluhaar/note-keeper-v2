import { useNotesContext } from "../../Context/NotesContext";
import { Card, CardContent, CardTitle } from "../ui/card";

const Account = () => {
  const { userData } = useNotesContext() as Context;

  if (userData === undefined || Object.keys(userData).length === 0) return;

  return (
    <Card className="p-2 w-45 mt-3">
      <CardTitle className="px-2">Account</CardTitle>
      <CardContent className="pt-2">
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </CardContent>
    </Card>
  );
};

export default Account;
