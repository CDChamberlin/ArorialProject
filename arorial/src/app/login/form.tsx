"use client";

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        console.log("Submitting Form", data);
        const { email, password } = data;

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log({ response });
            if (!response?.error) {
                router.push("/");
                router.refresh();
            }

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Login Successful", response);
        } catch (error: any) {
            console.error("Login Failed:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center dark:text-white">
                Adventurer Check - In
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    {...register("email")}
                    className="dark:text-gray-600 mb-2"
                />
                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}

                <label htmlFor="password">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password")}
                    placeholder="Password"
                    className="dark:text-gray-600 mb-2"
                />
                {errors.password && (
                    <p className="text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}

                <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePasswordVisibility}
                />

                <button type="submit">Sign In</button>

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {/* You can implement an error message display here */}
                </div>
            </form>
            <Link href={"/signup"}>Adventurer Registration</Link>
        </>
    );
}
