import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";

import PageBreadcrumb from "@/components/PageBreadcrumb";
import CategoriesTable from "@/app/(admin)/admin/categories/CategoriesTable";

const Page = async () => {



    return (
        <main>
            <PageBreadcrumb />
            <div className="admin-header">
                <h1 className="admin-header__title">Category Management</h1>

                <Link href="/admin/categories/create" ><Button variant="outline" className="cursor-pointer">Create Category</Button></Link>

            </div>


        <CategoriesTable />






        </main>
    )
}
export default Page
