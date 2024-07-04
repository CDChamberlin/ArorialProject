"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [csrfToken, setCsrfToken] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const res = await fetch("/api/auth/csrf");
            const data = await res.json();
            setCsrfToken(data.csrfToken);
        };
        fetchCsrfToken();
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const response = await fetch("/api/auth/callback/credentials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ csrfToken, username, password }),
        });

        if (response.ok) {
            router.push("/profile");
        } else {
            // Handle errors
        }
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-center dark:text-white">
                Adventurer Check - In
            </h1>
            <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="csrfToken" value={csrfToken} />
                <label
                    htmlFor="username"
                    className="block text-md font-bold mb-2"
                >
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                    className="dark: text-gray-600 mb-2"
                />
                <label
                    htmlFor="password"
                    className="block text-md font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    required
                    className="dark: text-gray-600 mb-2"
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}
