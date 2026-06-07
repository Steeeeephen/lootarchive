import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
    return (
        <main>
            <div className="admin-header">
                <h1 className="admin-header__title">Brand Management</h1>

                <Link href="/admin/brands/create" ><Button variant="outline" className="cursor-pointer">Create Brand</Button></Link>


            </div>
        </main>
    )
}
export default Page
