const updateNotes = (notes: UserNotes[], id: string, email: string) => {
  return fetch("http://localhost:3000/note", {
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
    const response = await fetch(
      `http://localhost:3000/notes?userId=${userId}`
    );
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
    const response = await fetch("http://localhost:3000/delete-note", {
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
