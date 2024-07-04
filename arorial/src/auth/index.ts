import SequelizeAdapter, { models } from "@auth/sequelize-adapter";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DataTypes, Sequelize } from "sequelize";

export const BASE_PATH = "/api/auth";

const sequelize = new Sequelize({
    host: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    database: process.env.DB_NAME,
    benchmark: true,
});
const authOptions: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                const users = [
                    {
                        id: "test-user-1",
                        userName: "test1",
                        name: "Test 1",
                        password: "pass",
                        email: "test1@donotreply.com",
                    },
                    {
                        id: "test-user-2",
                        userName: "test2",
                        name: "Test 2",
                        password: "pass",
                        email: "test2@donotreply.com",
                    },
                ];
                const user = users.find(
                    (user) =>
                        user.userName === credentials.username &&
                        user.password === credentials.password
                );
                return user
                    ? { id: user.id, name: user.name, email: user.email }
                    : null;
            },
        }),
    ],
    adapter: SequelizeAdapter(sequelize, {
        models: {
            User: sequelize.define("user", {
                ...models.User,
                password: { allowNull: false, type: DataTypes.STRING },
            }),
        },
    }),
    basePath: BASE_PATH,
    secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
