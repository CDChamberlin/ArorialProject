import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Arorial",
    description: "Dungeons and Dragons 5th Edition Campaign Setting",
    creator: "Collin Chamberlin",
    generator: "Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <main>{children}</main>
                </SessionProvider>
            </body>
        </html>
    );
}
