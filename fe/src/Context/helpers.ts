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

const logIn = async (email: string, password: string, name: string) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
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

export { getNotes, logIn };
