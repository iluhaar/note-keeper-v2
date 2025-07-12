// Password hashing using Web Crypto API - compatible with Convex runtime
// This provides good security without requiring Node.js APIs

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Convert password to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Import the password as a key
    const key = await crypto.subtle.importKey(
      "raw",
      data,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    // Derive bits using PBKDF2 with high iteration count
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000, // High iteration count for security
        hash: "SHA-256",
      },
      key,
      256
    );

    // Convert to base64 strings and combine
    const hashArray = new Uint8Array(derivedBits);
    const saltString = btoa(String.fromCharCode(...salt));
    const hashString = btoa(String.fromCharCode(...hashArray));

    return `${saltString}:${hashString}`;
  } catch (err) {
    console.error("Hashing error:", err);
    throw new Error("Failed to hash password");
  }
};

export const verifyPassword = async (
  password: string,
  storedHash: string
): Promise<boolean> => {
  try {
    // Split the stored hash to get salt and hash
    const [saltString, hashString] = storedHash.split(":");

    // Convert back to Uint8Arrays
    const salt = new Uint8Array(
      atob(saltString)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const storedHashArray = new Uint8Array(
      atob(hashString)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Hash the provided password with the same salt
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const key = await crypto.subtle.importKey(
      "raw",
      data,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256
    );

    const hashArray = new Uint8Array(derivedBits);

    // Compare the hashes
    if (hashArray.length !== storedHashArray.length) {
      return false;
    }

    for (let i = 0; i < hashArray.length; i++) {
      if (hashArray[i] !== storedHashArray[i]) {
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
};
