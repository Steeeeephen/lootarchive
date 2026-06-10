import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import BrandsTable from "@/app/(admin)/admin/brands/BrandsTable";

const Page = async () => {



    return (
        <main>
            <PageBreadcrumb />
            <div className="admin-header">
                <h1 className="admin-header__title">Brand Management</h1>
                <Link href="/admin/brands/create" ><Button variant="outline" className="cursor-pointer">Create Brand</Button></Link>
            </div>
            <BrandsTable />
        </main>
    )
}
export default Page
