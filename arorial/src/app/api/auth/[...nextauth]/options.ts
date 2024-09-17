import { compare } from "bcrypt";
import prisma from "lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    text: "text",
                    placeholder: "jsmith",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email || "" },
                });

                if (!user || !user.password) {
                    return null;
                }
                const passwordCorrect = await compare(
                    credentials?.password ?? "",
                    user.password
                );

                if (passwordCorrect) {
                    return { id: user.id, username: user.username };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
};
