"use client";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Call signIn with the credentials
        await signIn("credentials", {
            redirect: false,
            username,
            password,
        });
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center dark:text-white">
                Adventurer Check - In
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name</label>
                <input
                    id="userName"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="dark: text-gray-600 mb-2"
                />
                <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePasswordVisibility}
                />
                <button type="submit">Sign In</button>
            </form>
            <Link href={"/signup"}>Adventurer Registration</Link>
        </>
    );
}
