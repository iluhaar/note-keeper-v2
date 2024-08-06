import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  update,
  remove,
  onValue,
} from "firebase/database";
import { firebaseConfig } from "../constants";

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const getData = async () => {
  const snapshot = await get(ref(database, "notes"));

  const data = snapshot.val();

  return data;
};

const updateData = async (data: any[]) => {
  const databaseRef = ref(database, "notes");

  return update(databaseRef, {
    ...data,
  });
};

const deleteData = async (id: string) => {
  const databaseRef = ref(database, `/notes/${id}`);

  return remove(databaseRef).then((d) => {
    console.log(d);
  });
};

export { getData, updateData, deleteData };
