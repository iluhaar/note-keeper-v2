import { BASE_URL } from "@/constants";

const updateNotes = (notes: UserNotes[], id: string, email: string) => {
  return fetch(`${BASE_URL}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id, email, notes }),
  });
};

const getNotes = async (userId: string): Promise<UserNotes[] | []> => {
  try {
    const response = await fetch(`${BASE_URL}/notes?userId=${userId}`);
    const data = await response.json();

    if (data === undefined && data.notes === undefined) return [];
    return data || [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const removeNote = async (notes: UserNotes[], id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/delete-note`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ notes, userId: id }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getNotes, updateNotes, removeNote };
