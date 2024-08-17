"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface LoginButtonProps {
    session: Session | null;
}
export default function LoginButton({ session }: LoginButtonProps) {
    return (
        <>
            {session === null ? (
                <button
                    onClick={() => {
                        console.log("Clicked sign in");
                        signIn();
                    }}
                >
                    Sign in
                </button>
            ) : (
                <button onClick={() => signOut()}>Sign Out</button>
            )}
        </>
    );
}
