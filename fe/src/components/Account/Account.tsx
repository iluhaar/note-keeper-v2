import { useNotesContext } from "../../Context/NotesContext";

const Account = () => {
  const { userData } = useNotesContext() as Context;

  if (userData === undefined || Object.keys(userData).length === 0) return;

  return (
    <div className="account">
      <h2>Account</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default Account;
