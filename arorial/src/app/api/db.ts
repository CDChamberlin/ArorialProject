import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
    try {
        await prisma.$connect();
        console.log("Connection has been established successfully");

        // You don't need to sync the schema as Prisma handles migrations
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})();

export default prisma;
