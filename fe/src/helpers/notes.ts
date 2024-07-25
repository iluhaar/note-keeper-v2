const updateNotes = (notes: UserNotes[]) => {
  return fetch("http://localhost:3000/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify([...notes]),
  });
};

const getNotes = async (): Promise<UserNotes[]> => {
  try {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export { getNotes, updateNotes };
