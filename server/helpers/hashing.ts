import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.log(err);
  }
};

export const verifyPassword = async (password: string, hash: string) => {
  try {
    const isValid = await argon2.verify(password, hash);
    return isValid;
  } catch (err) {
    console.log(err);
  }
};
