import * as argon2 from "argon2-browser";

export const hashPassword = async (
    password: string,
    salt: string
): Promise<string> => {
    const { encoded } = await argon2.hash({
        pass: password,
        salt: new TextEncoder().encode(salt), // Convert the salt to a Uint8Array
    });
    return encoded;
};

export const verifyPassword = async (
    encoded: string,
    password: string
): Promise<boolean> => {
    const match = await argon2.verify({
        encoded,
        pass: password,
    });
    return match === true;
};
