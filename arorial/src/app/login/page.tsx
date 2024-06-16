import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function LoginPage() {
    const router = useRouter();
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            router.push("/profile");
        } else {
            // Handle errors
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                id="userID"
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                id="userPassword"
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
