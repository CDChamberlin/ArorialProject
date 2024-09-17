import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        username?: string | null;
        emailVerified?: Date | null; // Ensure emailVerified is included here
    }

    interface Session {
        user: User & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username?: string | null;
        emailVerified?: Date | null; // Ensure emailVerified is included here
    }
}
