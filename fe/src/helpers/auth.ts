const loginUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | string | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}> => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return {
      success: data.success,
      error: data.error,
      data: data.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error,
      data: null,
    };
  }
};

const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<{
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | any | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}> => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await response.json();
    return {
      data: data.data,
      error: data.error,
      success: data.success,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error,
      data: [],
    };
  }
};

export { loginUser, registerUser };
