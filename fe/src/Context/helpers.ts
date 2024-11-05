import { BASE_URL } from "@/constants";
import { FormEvent } from "react";
import { v4 as uuid } from "uuid";


const getNotes = async (): Promise<UserNotes[]> => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(error);

    return [];
  }
};

const logIn = async (email: string, password: string, name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(error);

    return false;
  }
};

const performNewFolder = (event: FormEvent<HTMLFormElement>): PerformNewFolderReturnType | null => {
  const form = new FormData(event.currentTarget);

  const data = [] as unknown as NewFolder[];

  for (const [key, value] of form.entries()) {
    const rs = String(value);
    data.push({
      key,
      value: rs,
    });
  }

  if (!data) return null

  const name = data.find(d => d.key === "folder_name")?.value

  if (!name) return null

  const notes = data.slice(1)

  const id = `${name}-${uuid()}`

  return {
    id,
    name,
    notes
  }
}

export { getNotes, logIn, performNewFolder };