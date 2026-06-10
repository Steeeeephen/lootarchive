
import React from 'react'
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import LoginForm from "@/app/admin/login/LoginForm";
import {redirect} from "next/navigation";


const Page = async () => {

    const session = await auth.api.getSession({ headers: await headers()});

    if(session?.user.role === "admin") return (
        redirect("/admin")
    )

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Admin Portal</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to manage your store</p>
                </div>
                <LoginForm />
                <p className="text-center text-xs text-gray-400 mt-6">
                    Restricted access — authorized personnel only
                </p>
            </div>
        </div>
    )
}

export default Page