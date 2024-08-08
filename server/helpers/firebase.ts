import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { firebaseConfig } from "../constants";

import { v4 as uuid } from "uuid";
import { hashPassword, verifyPassword } from "./hashing";
import { mockedNotes } from "../routes";

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const isUserExists = async (email: string) => {
  const snapshot = await get(ref(database, `users`));
  try {
    const storedData: Users = snapshot.val();

    if (storedData != null) {
      return Object.values(storedData).some((u) => u.email === email);
    }

    return false;
  } catch (error) {
    console.log("🚀 ~ isUserExists ~ error:", error);
  }
};

const getData = async (userId: string) => {
  const snapshot = await get(ref(database, `notes/${userId}`));

  const data = snapshot.val();

  if (data === null) return [];
  return data;
};

const updateData = async (data: Data, userId: string) => {
  const databaseRef = ref(database, "notes");

  const snapshot = await get(ref(database, `users/${userId}`));
  const storedData: Users = snapshot.val();

  if (storedData === null) {
    return update(databaseRef, {
      [userId]: mockedNotes,
    });
  }

  return update(databaseRef, {
    [userId]: data.notes,
  });
};

const loginUser = async (data: LoginData) => {
  const { password, email } = data;

  const snapshot = await get(ref(database, "users"));
  const storedData: Users = snapshot.val();

  const userData = Object.values(storedData).find((u) => u.email === email);

  if (userData === undefined) {
    return { success: false, error: "User is not exists" };
  }

  const { password: storedPassword } = userData;

  const isValid = await verifyPassword(storedPassword, password);

  if (!isValid) {
    return { success: false, error: "Password is incorrect" };
  }

  return { success: true, error: null, data: userData };
};

const createUser = async (
  email: string,
  password: string,
  name: string
): Promise<registerI> => {
  const databaseRef = ref(database, "users");

  const isUserPresent = await isUserExists(email);

  if (isUserPresent) {
    return {
      success: false,
      error: "User all ready exists",
      data: null,
    };
  }

  const id = `${name}-${uuid()}`;

  const userData = {
    name,
    email,
    password: await hashPassword(password),
    id,
  };

  try {
    await update(databaseRef, { [id]: userData });
    delete userData.password;
    return { success: true, error: null, data: userData };
  } catch (error) {
    console.log(error);
    return { success: false, error, data: null };
  }
};

const deleteData = async (data: Data, id: string) => {
  const databaseRef = ref(database, `/notes/${id}`);

  return update(databaseRef, {
    [id]: data.notes,
  });
};

export { getData, updateData, deleteData, loginUser, createUser };

interface Users {
  email: string;
  password: string;
  name: string;
  id: string;
}

interface registerI {
  success: boolean;
  error: any;
  data: any;
}

interface LoginData {
  email: string;
  password: string;
}

interface Data {
  userId: string;
  email: string;
  notes: Note[];
}

interface Note {
  id: string;
  note: string;
}
