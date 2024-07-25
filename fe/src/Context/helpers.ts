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

export { getNotes };
