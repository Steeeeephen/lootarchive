"use client"

import React from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Field, FieldGroup, FieldLabel, FieldLegend} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Page = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            setError(error.message ?? "An unexpected error occurred.");
            setLoading(false);
            return;
        }

        // Successful login — send them to the admin area
        router.push("/admin");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">

            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Admin Portal</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to manage your store</p>
                </div>

                {/* Card */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <FieldGroup className="flex flex-col gap-5">
                        <FieldLegend className="text-lg font-medium text-gray-800 mb-1">Login</FieldLegend>

                        <Field className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </FieldLabel>
                            <Input
                                onChange={(e) => setEmail(e.target.value ?? "")}
                                id="email"
                                type="email"
                                placeholder="admin@yourstore.com"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </Field>

                        <Field className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <FieldLabel htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </FieldLabel>
                                <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                onChange={(e) => setPassword(e.target.value ?? "")}
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="w-full mt-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                            Sign in
                        </Button>

                    </FieldGroup>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Restricted access — authorized personnel only
                </p>

            </div>

        </div>
    )
}

export default Page