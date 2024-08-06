"use client";
import React, { FormEvent, useState } from "react";
interface FormData {
    email: string;
    username: string;
    password: string;
    terms: boolean;
}
// Constants for populating select options. May be edited

export default function SignUpPage() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        username: "",
        password: "",
        terms: false,
    });
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Submit pushed. " + formData);
    }
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center dark:text-white">
                Adventurer Membership Sign Up
            </h1>
            <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <label htmlFor="email">
                    Enter your Spell Scroll (Email Address):
                </label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="username">
                    Choose your Adventurer's Alias (Username):
                </label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">
                    Forge your Arcane Lock (Password):
                </label>
                <input type="password" id="password" name="password" required />

                <label>
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                    />
                    Swear an Oath to the Adventurer's Code
                </label>

                <button type="submit">Join the Quest</button>
            </form>
        </>
    );
}
