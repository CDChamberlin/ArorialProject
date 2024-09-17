"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    username: z.string().min(1, "Username is required"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            terms: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        console.log("Submitting form", data);
        const { email, password, username } = data;
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            console.log("Registration Successful", response);
        } catch (error: any) {
            console.error("Registration Failed: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
            >
                Enter your Spell Scroll (Email Address):
            </label>
            <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
            )}

            <label
                htmlFor="username"
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
            >
                Choose your Adventurer's Alias (Username):
            </label>
            <input
                type="text"
                id="username"
                {...register("username")}
                className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
            )}

            <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
            >
                Forge your Arcane Lock (Password):
            </label>
            <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-3 py-2 mb-6 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}

            <label className="flex items-center text-gray-700 dark:text-gray-300 mb-6">
                <input
                    type="checkbox"
                    {...register("terms")}
                    className="mr-2"
                />
                Swear an Oath to the Adventurer's Code
            </label>
            {errors.terms && (
                <p className="text-red-500">{errors.terms.message}</p>
            )}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Join the Quest
                </button>
            </div>
        </form>
    );
}
