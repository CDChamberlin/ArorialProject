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
        console.log("Submit pushed. " + JSON.stringify(formData));
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
            <h1 className="text-4xl font-bold text-center dark:text-white mb-8">
                Adventurer Membership Sign Up
            </h1>

            <form
                className="shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                >
                    Enter your Spell Scroll (Email Address):
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />

                <label
                    htmlFor="username"
                    className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                >
                    Choose your Adventurer's Alias (Username):
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />

                <label
                    htmlFor="password"
                    className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                >
                    Forge your Arcane Lock (Password):
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-6 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />

                <label className="flex items-center text-gray-700 dark:text-gray-300 mb-6">
                    <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                        className="mr-2"
                    />
                    Swear an Oath to the Adventurer's Code
                </label>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Join the Quest
                    </button>
                </div>
            </form>
        </>
    );
}
