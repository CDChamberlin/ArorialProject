/* "use server";
import * as bcrypt from "bcryptjs";
export const hashPassword = async (
    password: string,
    saltRounds: number
): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
export const verifyPassword = async (
    password: string,
    hashPassword: string
): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
}; */
export const hashPassword = async (
    password: string,
    salt: string
): Promise<string> => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);

    // Generate a key using PBKDF2
    const key = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const derivedKey = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: 100000, // Number of iterations
            hash: "SHA-256", // Hashing algorithm to use
        },
        key,
        { name: "AES-GCM", length: 256 }, // The derived key algorithm and length
        true,
        ["encrypt", "decrypt"]
    );

    // Export the derived key to a string format
    const exportedKey = await crypto.subtle.exportKey("raw", derivedKey);
    return Buffer.from(exportedKey).toString("hex");
};

export const verifyPassword = async (
    storedHash: string,
    password: string,
    salt: string
): Promise<boolean> => {
    const hash = await hashPassword(password, salt);
    return storedHash === hash;
};
