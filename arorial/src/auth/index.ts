import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import { verifyPassword } from "utils/hash";
import prisma from "../../lib/prisma";

export const BASE_PATH = "/api/auth";

const providers: Provider[] = [
    Discord,
    Credentials({
        name: "Credentials",
        credentials: {
            username: {
                label: "Username",
                type: "string",
                placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any): Promise<User | null> {
            if (!credentials?.username || !credentials?.password)
                throw new Error("Missing Username or Password");

            const user = await prisma.user.findUnique({
                where: { username: credentials.username },
            });

            if (!user) {
                return null;
            }
            if (!user.password) {
                throw new Error("Please use alternate login method");
            }
            const isPasswordMatch = await verifyPassword(
                credentials.password,
                user.password,
                user.salt
            );
            if (isPasswordMatch) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                } as User;
            } else {
                return null;
            }
        },
    }),
];
export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
    } else {
        return { id: provider.id, name: provider.name };
    }
});
const authOptions: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },
    providers,
    adapter: PrismaAdapter(prisma),
    basePath: BASE_PATH,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname === "middlewareProtected") return !!auth;
            return true;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
