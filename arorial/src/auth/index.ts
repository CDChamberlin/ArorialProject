import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "utils/hash";
import prisma from "../../lib/prisma";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "string",
                    placeholder: "jsmith@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    return null;
                }
                if (!user.password) {
                    throw new Error("Please use alternate login method");
                }
                const isPasswordMatch = await verifyPassword(
                    credentials.password,
                    user.password
                );
                if (isPasswordMatch) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                } else {
                    throw new Error("Email and password are invalid");
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    basePath: BASE_PATH,
    secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
