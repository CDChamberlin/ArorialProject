import { hash } from "bcrypt";
import prisma from "lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        console.log({ email, password, username });

        const hashedPassword = await hash(password, 10);
        const response = await prisma.user.create({
            data: { email, password: hashedPassword, username },
        });
        return NextResponse.json({
            message: "User created successfully",
            response,
        });
    } catch (error: any) {
        console.error("Error creating user: ", error);
        return NextResponse.json(
            { message: "Failed to create user", error: error.message },
            { status: 500 }
        );
    }
}
